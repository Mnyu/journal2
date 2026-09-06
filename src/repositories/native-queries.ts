import { sql } from 'drizzle-orm';

export const monthlyStatForCurrentMonthSql = (userId: string) => sql`
  with stats as (
    select
      to_char(date_trunc('month', exit_date),'YYYY-MM') as year_month,
      to_char(date_trunc('month', exit_date),'FMMonth YYYY') as month,
      count(*) as trades,
      count(*) filter (where return >= 0) as wins,
      count(*) filter (where return < 0) as losses,
      round(avg(return) filter (where return >= 0), 2) as avg_gain,
      round(avg(return) filter (where return < 0), 2) as avg_loss
    from trades
    where
      user_id = ${userId}
      and exit_date is not null
      and date_trunc('month', exit_date) >= date_trunc('month', current_date - interval '1 month')
    group by
      date_trunc('month', exit_date)
  )
  select
    year_month,
    month,
    trades,
    wins,
    losses,
    round(wins::numeric / nullif((wins + losses), 0) * 100, 2) as win_rate,
    avg_gain,
    avg_loss,
    round(avg_gain / abs(avg_loss), 2) as risk_reward,
    round(
      (avg_gain * wins) /
      nullif((abs(avg_loss) * losses), 0),
      2
    ) as edge
    from stats
`;

export const monthlyDistributionForCurrentMonthSql = (userId: string) => sql`
  with distribution as(
    select
      user_id,
      to_char(date_trunc('month', exit_date),'YYYY-MM') as year_month,
      round(return_percent, 0) as return_percent,
      count(*) as number_of_trades
    from trades
    where
    user_id = ${userId}
    and exit_date is not null
    and date_trunc('month', exit_date) >= date_trunc('month', current_date - interval '1 month')
    group by user_id, date_trunc('month', exit_date), round(return_percent, 0)
  )
  select
    user_id,
    year_month,
    json_agg(
      json_build_object(
        'returnPercent', return_percent,
        'numberOfTrades', number_of_trades
      )
      order by return_percent
    ) as distribution
  from distribution
  group by user_id, year_month
`;

export const last12MonthsEdgeAndWinRateSql = (userId: string) => sql`
  with months as (
    select generate_series(
      date_trunc('month', current_date) - interval '11 months',
      date_trunc('month', current_date),
      interval '1 month'
    ) as month_start
  ),
  stats as (
    select 
      date_trunc('month', exit_date) AS month_start,
      count(*) filter (where return >= 0) as wins,
      count(*) filter (where return < 0) as losses,
      round(avg(return) filter (where return >= 0),2) as avg_gain,
      round(avg(return) filter (where return < 0),2) as avg_loss
    from trades
    where 
    user_id = ${userId}
    and exit_date is not null
    and exit_date >= date_trunc('month', current_date) - interval '11 months'
    group by date_trunc('month', exit_date)
  )
  select
    to_char(m.month_start, 'FMMon YY') AS month, 
    coalesce(round((s.avg_gain * s.wins) / nullif((abs(s.avg_loss) * s.losses), 0),2), 0) as edge,
    coalesce(round(s.wins::numeric / nullif((s.wins+s.losses), 0) * 100,2), 0) as win_rate
    from 
    months m left join stats s on m.month_start = s.month_start 
    order by m.month_start desc
`;

export const last3YearsDistributionSql = (userId: string) => sql`
  select 
    round(return_percent, 0) as return_percent,
    extract(year from exit_date)::int AS year,
    count(*) as number_of_trades
  from trades
  where 
  user_id = ${userId}
  and exit_date is not null
  and exit_date >= date_trunc('year', current_date) - interval '3 years'
  group by round(return_percent, 0), extract(year FROM exit_date)
  order by round(return_percent, 0)
`;

export const trajectorySql = (userId: string) => sql`
  with trajectory as (
      select
          'Last 5' as period,
          count(*) as trades,
          count(*) filter (where return >= 0) as wins,
          count(*) filter (where return < 0) as losses,
          coalesce(round(avg(return) filter (where return >= 0), 2), 0) as avg_gain,
          coalesce(round(avg(return) filter (where return < 0), 2), 0) as avg_loss
      from (
          select return
          from trades
          where
          user_id = ${userId}
          and exit_date is not null
          order by exit_date desc
          limit 5
      ) t

      union all

      select
          'Last 10',
          count(*),
          count(*) filter (where return >= 0),
          count(*) filter (where return < 0),
          coalesce(round(avg(return) filter (where return >= 0), 2), 0),
          coalesce(round(avg(return) filter (where return < 0), 2), 0)
      from (
          select return
          from trades
          where 
          user_id = ${userId}
          and exit_date is not null
          order by exit_date desc
          limit 10
      ) t

      union all

      select
          'Last Month (' || to_char(date_trunc('month', current_date - interval '1 month'),'FMMonth YYYY') || ')' ,
          count(*),
          count(*) filter (where return >= 0),
          count(*) filter (where return < 0),
          coalesce(round(avg(return) filter (where return >= 0), 2), 0),
          coalesce(round(avg(return) filter (where return < 0), 2), 0)
      from trades
      where 
        user_id = ${userId}
        and exit_date >= date_trunc('month', current_date - interval '1 month')
        and exit_date < date_trunc('month', current_date)

      union all

      select
          'Last Year (' || to_char(date_trunc('year', current_date - interval '1 year'), 'YYYY') || ')',
          count(*),
          count(*) filter (where return >= 0),
          count(*) filter (where return < 0),
          coalesce(round(avg(return) filter (where return >= 0), 2), 0),
          coalesce(round(avg(return) filter (where return < 0), 2), 0)
      from trades
      where 
        user_id = ${userId}
        and exit_date >= date_trunc('year', current_date - interval '1 year')
        and exit_date < date_trunc('year', current_date)
  )
  select
      period,
      trades,
      wins,
      losses,
      avg_gain,
      avg_loss,
      coalesce(round(wins::numeric * 100 /nullif(wins + losses, 0),2),0) as win_rate,
      coalesce(round(avg_gain / nullif(abs(avg_loss), 0),2),0) as risk_reward,
      coalesce(round((avg_gain * wins) /nullif(abs(avg_loss) * losses, 0),2),0) as edge
  from trajectory;
`;
