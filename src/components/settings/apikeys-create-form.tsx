import { createAPIKey } from '@/actions/key.actions';
import { CreateAPIKeyInput, createAPIKeySchema } from '@/schemas/key.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { CreateAPIKeyDialogState } from './apikeys-create';

interface CreateAPIKeyFormProps {
  setApiKey: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<CreateAPIKeyDialogState>>;
}

const CreateAPIKeyForm = ({ setApiKey, setState }: CreateAPIKeyFormProps) => {
  const form = useForm<CreateAPIKeyInput>({
    resolver: zodResolver(createAPIKeySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (formInput: CreateAPIKeyInput) => {
    try {
      const { key } = await createAPIKey(formInput);
      setApiKey(key);
      setState('success');
    } catch (error) {
      toast.error('Unable to create API key');
    }
  };

  return (
    <form id='create-key-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <DialogHeader>
        <DialogTitle className='text-lg xl:text-xl'>Create New API Key</DialogTitle>
        <DialogDescription className='text-md  leading-7'>
          Use API keys to securely authenticate requests from external services.
        </DialogDescription>
      </DialogHeader>
      <Controller
        name='name'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='create-key-name' className='text-md'>
              Name
            </FieldLabel>
            <Input
              {...field}
              id='create-key-name'
              aria-invalid={fieldState.invalid}
              placeholder='my-test-key'
              autoComplete='off'
              className='h-10 px-4'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <DialogFooter className='bg-popover'>
        <DialogClose asChild>
          <Button variant='outline'>Cancel</Button>
        </DialogClose>
        <Button type='submit'>Create</Button>
      </DialogFooter>
    </form>
  );
};
export default CreateAPIKeyForm;
