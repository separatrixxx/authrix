'use client'
import { ErrorPage } from '../../../page_components/ErrorPage/ErrorPage';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'authrix | 500',
	description: 'authrix | 500',
  };

export default function PageError(): JSX.Element {
	return (
		<ErrorPage error={500} />
	);
}
