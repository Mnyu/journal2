import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <section className='flex h-full items-center justify-center'>
      <Loader2 className='size-8 animate-spin text-primary' />
    </section>
  );
};
export default Loading;
