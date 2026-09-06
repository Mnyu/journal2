'use client';

import { getLastSixMonths } from '@/lib/months';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface MonthSelectorProps {
  selectedMonth?: string;
}

const MonthSelector = ({ selectedMonth }: MonthSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const handleChange = (month: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', month);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const months = getLastSixMonths();

  return (
    <Select value={selectedMonth ?? months[0].value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue placeholder='Select Month' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default MonthSelector;
