export const formatStringAmountInInr = (amount: string) => {
  if (amount != '0' && !amount) return '';
  const entry = parseFloat(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(entry);
  return formatted;
};

export const formatAmountInInr = (amount: number) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
  return formatted;
};
