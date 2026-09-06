export type MonthOption = {
  label: string;
  value: string;
};

export const getLastSixMonths = (): MonthOption[] => {
  const months: { label: string; value: string }[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);

    months.push({
      label: date.toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
    });
  }

  return months;
};

export const getCurrentMonth = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};
