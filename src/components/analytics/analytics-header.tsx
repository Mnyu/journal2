import DateRangePicker from '../date-picker-with-range';

const AnalyticsHeader = () => {
  return (
    <section className='pt-3 flex items-center justify-between px-2'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl leading-none font-semibold'>Analytics</h1>
        <p className='text-sm text-muted-foreground'>Insights into your system performance</p>
      </div>
      {/* <div>
        <DateRangePicker />
      </div> */}
    </section>
  );
};
export default AnalyticsHeader;
