import { Metadata } from 'next';
import { ReactNode } from 'react';


export const metadata: Metadata = {
	title: 'authrix | 404',
	description: 'authrix | 404',
  };

export default function PageNotFound(): ReactNode {
	return (
		<div>404</div>
	);
}
