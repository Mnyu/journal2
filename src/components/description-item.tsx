interface DescriptionItemProps {
  label: string;
  value: React.ReactNode;
}

const DescriptionItem = ({ label, value }: DescriptionItemProps) => {
  return (
    <div className='grid grid-cols-[1fr_2fr]'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className='font-medium'>{value}</p>
    </div>
  );
};
export default DescriptionItem;
