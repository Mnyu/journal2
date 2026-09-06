'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Replace with Posthog or similar
    console.error(error);
  }, []);
  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2'>
      <div className='relative h-full w-full hidden lg:block'>
        <Image src='/images/error.png' alt='error-image' fill priority sizes='100%' />
      </div>
      <div className='h-full flex items-center justify-center'>
        <Card className='w-full max-w-lg ring-0'>
          <CardHeader className='my-4 gap-3 text-center'>
            <CardTitle className='text-5xl xl:text-6xl py-2 font-serif'>Something went wrong</CardTitle>
            <CardDescription className='text-lg xl:text-xl font-sans'>
              Looks like this page took an unexpected turn. Let's get you back on track
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            {error.digest && <p className='text-md text-muted-foreground font-sans'>Error Reference: {error.digest}</p>}
            <Button className='w-full my-4 h-12 text-lg font-semibold rounded-xl cursor-pointer'>
              <Link href='/'>Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Error;
