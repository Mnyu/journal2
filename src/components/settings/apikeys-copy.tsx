import { Check, Copy } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { CreateAPIKeyDialogState } from './apikeys-create';

interface CopyAPIKeyProps {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<CreateAPIKeyDialogState>>;
}

const CopyAPIKey = ({ apiKey, setApiKey, setState }: CopyAPIKeyProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      //toast.success('API key copied to clipboard.');
    } catch {
      //toast.error('Failed to copy API key.');
    }
  };

  const handleDone = () => {
    setState('create');
    setApiKey('');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-lg xl:text-xl'>Save your API Key</DialogTitle>
        <DialogDescription className='text-md  leading-7'>
          Please save your API key in a safe place since you won't be able to view it again. Keep it secure, as anyone
          with your API key can make requests on your behalf. If you do lose it, you'll need to generate a new one.
        </DialogDescription>
      </DialogHeader>
      <div className='rounded-lg border bg-muted/40 p-4 flex items-center justify-between gap-2'>
        <Input
          readOnly
          value={apiKey}
          className='!border-0 !bg-transparent !shadow-none !font-mono focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0'
          spellCheck={false}
          autoComplete='off'
        />
        <div className='flex justify-end'>
          <Button type='button' variant='secondary' size='sm' onClick={handleCopy}>
            {copied ? (
              <>
                <Check className='mr-2 size-4' />
                Copied
              </>
            ) : (
              <>
                <Copy className='mr-2 size-4' />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      <DialogFooter className='bg-popover'>
        <DialogClose asChild>
          <Button type='button' onClick={handleDone}>
            Done
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
export default CopyAPIKey;
