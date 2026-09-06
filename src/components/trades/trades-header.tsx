const TradesHeader = () => {
  return (
    <section className='pt-3 flex items-center justify-between px-2'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl leading-none font-semibold'>Trades</h1>
        <p className='text-sm text-muted-foreground'>All your trades</p>
      </div>
      {/* <div>
        <Button>
          <RefreshCcw />
          Refresh
        </Button>
      </div> */}
    </section>
  );
};
export default TradesHeader;
