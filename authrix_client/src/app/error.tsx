'use client'
import { Metadata } from 'next';
import { ReactNode } from 'react';


export const metadata: Metadata = {
	title: 'authrix | 500',
	description: 'authrix | 500',
};

export default function PageError(): ReactNode {
	return (
		<div>500</div>
	);
}
