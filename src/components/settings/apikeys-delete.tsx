import { deleteAPIKey } from '@/actions/key.actions';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const DeleteAPIKey = ({ id }: { id: string }) => {
  const handleDeleteAPIKey = async (id: string) => {
    try {
      await deleteAPIKey(id);
      toast.success('API key deleted successfully.');
    } catch (error) {
      toast.error('Unable to delete API key currently.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='cursor-pointer'>
          <X className='text-red-400' />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-xl'
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-lg xl:text-xl'>Delete your API Key</DialogTitle>
          <DialogDescription className='text-md leading-7'>
            This API key will immediately be deleted. API requests made using this key will be rejected, which could
            cause any systems still depending on it to break. Once deleted, you'll no longer be able to view or use this
            API key.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-popover'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            type='button'
            onClick={async () => {
              await handleDeleteAPIKey(id);
            }}
            className='bg-red-400'
          >
            Delete Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteAPIKey;
