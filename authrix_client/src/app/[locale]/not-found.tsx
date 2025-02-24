import { ErrorPage } from '../../../page_components/ErrorPage/ErrorPage';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'authrix | 404',
	description: 'authrix | 404',
  };

export default function PageNotFound(): JSX.Element {
	return (
		<ErrorPage error={404} />
	);
}
