'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { type DateRange } from 'react-day-picker';

const DateRangePicker = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' id='date-picker-range' className='justify-start px-2.5 font-normal'>
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar mode='range' defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
};
export default DateRangePicker;
