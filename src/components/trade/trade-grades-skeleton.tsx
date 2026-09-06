import { Skeleton } from '../ui/skeleton';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '../ui/card';

const TradeRatingSkeleton = () => {
  return (
    <Card className='ring-0 pt-0'>
      <CardHeader>
        <Skeleton className='h-6 w-20 bg-input' />
      </CardHeader>

      <CardContent className='grid gap-4'>
        {/* Rating */}
        <div className='grid grid-cols-[1fr_1fr_1fr] items-center gap-4'>
          <Skeleton className='h-4 w-14' />

          <div className='flex gap-2'>
            <Skeleton className='size-6 rounded-full' />
            <Skeleton className='size-6 rounded-full' />
            <Skeleton className='size-6 rounded-full' />
            <Skeleton className='size-6 rounded-full' />
            <Skeleton className='size-6 rounded-full' />
          </div>

          <Skeleton className='h-4 w-12' />
        </div>

        {/* Comments */}
        <div className='grid gap-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-[120px] w-full rounded-md' />
        </div>

        {/* TradeInsights */}
        <div className='space-y-3 rounded-lg border p-4'>
          <Skeleton className='h-5 w-36' />

          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[90%]' />
            <Skeleton className='h-4 w-[75%]' />
          </div>

          <div className='flex gap-2 pt-2'>
            <Skeleton className='h-8 w-20 rounded-md' />
            <Skeleton className='h-8 w-24 rounded-md' />
            <Skeleton className='h-8 w-16 rounded-md' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TradeGradesSkeleton = () => {
  return (
    <section className='w-full h-full'>
      <Card className='w-full h-full'>
        <CardHeader className='flex items-center justify-between'>
          <Skeleton className='h-7 w-28' />

          <Skeleton className='h-10 w-24 rounded-md' />
        </CardHeader>

        <CardContent className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
          <TradeRatingSkeleton />
          <TradeRatingSkeleton />
        </CardContent>
      </Card>
    </section>
  );
};
export default TradeGradesSkeleton;
