'use client'
import { ErrorPage } from '../../../page_components/ErrorPage/ErrorPage';
import { Metadata } from 'next';
import { ReactNode } from 'react';


export const metadata: Metadata = {
	title: 'authrix | 500',
	description: 'authrix | 500',
  };

export default function PageError(): ReactNode {
	return (
		<ErrorPage error={500} />
	);
}
