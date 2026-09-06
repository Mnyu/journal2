const SettingsHeader = () => {
  return (
    <section className='pt-3 flex items-center justify-between px-2 py-2'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl leading-none font-semibold'>Settings</h1>
        <p className='text-sm text-muted-foreground'>Review and update your account settings.</p>
      </div>
    </section>
  );
};
export default SettingsHeader;
