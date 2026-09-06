'use client';

import { DistributionPointDTO } from '@/types/dto';
import { Area, AreaChart, Legend, ReferenceLine, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  trades: {
    label: 'Trades',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

interface DashboardBellCurveProps {
  distribution: DistributionPointDTO[];
}

const DashboardBellCurve = ({ distribution }: DashboardBellCurveProps) => {
  return (
    <section>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Return Distribution</CardTitle>
          <CardDescription>Frequency distribution of completed trades by return percentage.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='w-full h-[220px] sm:h-[240px] md:h-[260px]'>
            <AreaChart
              data={distribution}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <ReferenceLine x={0} label='x = 0' />
              <XAxis
                domain={[(dataMin: number) => dataMin - 5, (dataMax: number) => dataMax + 5]}
                type='number'
                dataKey='returnPercent'
                label={{
                  value: 'Return %',
                  position: 'insideBottom',
                  offset: 0,
                }}
              />
              <YAxis
                label={{
                  value: 'No of Trades',
                  angle: -90,
                }}
              />
              <Area
                type='monotone'
                dataKey='numberOfTrades'
                name='No of Trades'
                connectNulls={true}
                fill='var(--color-trades)'
                fillOpacity={0.05}
                stroke='var(--color-trades)'
                strokeWidth={2}
                dot={{
                  fill: 'var(--primary)',
                }}
                activeDot={{
                  r: 5,
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign='top' align='right' />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
};
export default DashboardBellCurve;
