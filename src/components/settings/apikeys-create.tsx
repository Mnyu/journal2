'use client';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { useState } from 'react';
import CopyAPIKey from './apikeys-copy';
import CreateAPIKeyForm from './apikeys-create-form';

export type CreateAPIKeyDialogState = 'create' | 'success';

const CreateAPIKey = () => {
  const [state, setState] = useState<CreateAPIKeyDialogState>('create');
  const [apiKey, setApiKey] = useState('');

  const handlePointerDownOutside = (e: Event) => {
    if (state === 'success') {
      e.preventDefault();
    }
  };

  const handleEscapeKeyDown = (e: Event) => {
    if (state === 'success') {
      e.preventDefault();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create API Key</Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-xl'
        onPointerDownOutside={handlePointerDownOutside}
        onEscapeKeyDown={handleEscapeKeyDown}
      >
        {state === 'create' && <CreateAPIKeyForm setApiKey={setApiKey} setState={setState} />}
        {state === 'success' && <CopyAPIKey apiKey={apiKey} setApiKey={setApiKey} setState={setState} />}
      </DialogContent>
    </Dialog>
  );
};
export default CreateAPIKey;
