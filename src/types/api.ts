import { AppError } from '@/lib/errors';
import { NextResponse } from 'next/server';

export const apiSuccess = <T>(message: string, data: T, status: number): NextResponse => {
  return NextResponse.json({ message: message, data }, { status: status });
};

export const apiError = (error: AppError): NextResponse => {
  console.error(error);
  return NextResponse.json(
    { error: error.message, details: error.details ? error.details : '' },
    { status: error.status },
  );
};
