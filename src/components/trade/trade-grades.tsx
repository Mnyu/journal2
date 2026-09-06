'use client';
import { saveReviews } from '@/actions/trade.actions';
import { cn } from '@/lib/utils';
import { TradeReviewsDTO } from '@/types/dto';
import { Loader2Icon, SaveIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '../ui/card';
import TradeRating from './trade-rating';

interface TradeGradesProps {
  tradeId: string;
  reviews: TradeReviewsDTO | null;
  saveReviews: typeof saveReviews;
}

const TradeGrades = ({ tradeId, reviews }: TradeGradesProps) => {
  const form = useForm<TradeReviewsDTO>({
    defaultValues: {
      tradeId: tradeId,
      entry: reviews && reviews.entry ? reviews.entry : { type: 'ENTRY', score: 0, comments: '' },
      exit: reviews && reviews.exit ? reviews.exit : { type: 'EXIT', score: 0, comments: '' },
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: TradeReviewsDTO) => {
    const response = await saveReviews(data);
    if (response.success) {
      form.reset(response.data);
      toast.success('Grading successful');
    } else {
      form.reset();
      toast.error(response.error.message);
    }
  };

  // if (form.formState.isSubmitting) {
  //   return <TradeGradesSkeleton />;
  // }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className='w-full h-full'>
          <Card className='w-full h-full'>
            <CardHeader>
              <CardTitle>Grading</CardTitle>
              <CardAction className='flex items-center justify-between gap-2'>
                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  className={cn(
                    'w-30 h-10',
                    'transition-opacity duration-200',
                    form.formState.isDirty ? 'opacity-100' : 'pointer-events-none opacity-0',
                  )}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2Icon className='animate-spin' />
                      Saving
                    </>
                  ) : (
                    <>
                      <SaveIcon />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => form.reset()}
                  disabled={form.formState.isSubmitting}
                  className={cn(
                    'w-30 h-10',
                    'transition-opacity duration-200',
                    form.formState.isDirty ? 'opacity-100' : 'pointer-events-none opacity-0',
                  )}
                >
                  Cancel
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              <TradeRating title='Entry' type='entry' />
              <TradeRating title='Exit' type='exit' />
            </CardContent>
          </Card>
        </section>
      </form>
    </FormProvider>
  );
};
export default TradeGrades;
