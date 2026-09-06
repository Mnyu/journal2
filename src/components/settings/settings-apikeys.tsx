import { getKeys } from '@/lib/auth-session';
import CreateAPIKey from './apikeys-create';
import APIKeysTable from './apikeys-table';

const APIKeys = async () => {
  const { keys, total, limit, offset } = await getKeys();
  return (
    <section className='w-full h-full flex flex-col gap-4 mx-auto'>
      <div className='flex items-center justify-end'>
        <CreateAPIKey />
      </div>
      <APIKeysTable keys={keys} total={total} limit={limit} offset={offset} />
    </section>
  );
};
export default APIKeys;
