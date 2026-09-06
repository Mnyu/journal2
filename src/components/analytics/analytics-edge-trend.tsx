'use client';

import { MonthlyEdgeDTO } from '@/types/dto';
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  edge: {
    label: 'Edge',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

interface EdgeTrendProps {
  edges: MonthlyEdgeDTO[];
}

const EdgeTrend = ({ edges }: EdgeTrendProps) => {
  edges = edges.slice(0, 6).reverse();

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Edge Trend</CardTitle>
        <CardDescription>Monthly system edge over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent className='pl-0'>
        <ChartContainer config={chartConfig} className='w-full h-[220px] sm:h-[240px] md:h-[260px]'>
          <LineChart
            accessibilityLayer
            data={edges}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              type='category'
              dataKey='month'
              label={{
                value: 'Month',
                position: 'insideBottom',
                offset: 0,
              }}
            />
            <YAxis
              domain={[0, 5]}
              label={{
                value: 'Edge',
                angle: -90,
              }}
            />
            <Line
              type='monotone'
              dataKey='edge'
              connectNulls={true}
              strokeWidth={2}
              stroke='var(--color-edge)'
              dot={{
                fill: 'var(--color-edge)',
              }}
              activeDot={{
                r: 5,
              }}
            >
              <LabelList dataKey='edge' position='top' />
            </Line>
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default EdgeTrend;
