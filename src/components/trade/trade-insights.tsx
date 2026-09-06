import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface TradeInsightsProps {
  type: string;
}

const TradeInsights = ({ type }: TradeInsightsProps) => {
  return (
    <section className=''>
      <Card className='w-full h-full'>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>
            {`Intelligent analysis of this ${type} based on execution, outcome, and historical patterns.`}
          </CardDescription>
        </CardHeader>
        <CardContent>Coming soon...</CardContent>
      </Card>
    </section>
  );
};
export default TradeInsights;
