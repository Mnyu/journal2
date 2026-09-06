import { TradeReviewsDTO } from '@/types/dto';
import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldLabel } from '../ui/field';
import { Rating, RatingButton } from '../ui/rating';
import { Textarea } from '../ui/textarea';
import TradeInsights from './trade-insights';

interface TradeRatingProps {
  type: keyof TradeReviewsDTO;
  title: string;
}

const TradeRating = ({ type, title }: TradeRatingProps) => {
  const { control } = useFormContext<TradeReviewsDTO>();
  const controlName = type === 'entry' ? 'entry' : 'exit';

  return (
    <Card className='ring-0 pt-0'>
      <CardHeader>
        <CardTitle className='font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Controller
          name={`${controlName}.score`}
          control={control}
          render={({ field, fieldState }) => (
            <Field className='grid grid-cols-[1fr_1fr_1fr]'>
              <FieldLabel className='text-muted-foreground'>Rating</FieldLabel>
              <Rating value={field.value} onValueChange={field.onChange}>
                <RatingButton />
                <RatingButton />
                <RatingButton />
                <RatingButton />
                <RatingButton />
              </Rating>
              {field.value && <span className=''>{field.value} / 5</span>}
            </Field>
          )}
        />
        <Controller
          name={`${controlName}.comments`}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={`comments-${title.toLowerCase()}`} className='text-muted-foreground'>
                Comments
              </FieldLabel>
              <Textarea
                id={`comments-${title.toLowerCase()}`}
                placeholder={`How well did you execute the ${title.toLowerCase()}?`}
                className='h-[120px]'
                value={field.value}
                onChange={field.onChange}
              />
            </Field>
          )}
        />
        <TradeInsights type={type} />
      </CardContent>
    </Card>
  );
};
export default TradeRating;
