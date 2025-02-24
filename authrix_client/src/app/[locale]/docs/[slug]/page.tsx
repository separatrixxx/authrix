import { PageProps } from './page.props';
import { notFound } from 'next/navigation';


export default async function DocsSlugPage({ params }: PageProps) {
    const { slug } = await params;

    const content = {
        introduction: <div>Introduction Content</div>,
        'service-registration': <div>Service Registration Content</div>,
        widget: <div>Widget Content</div>,
    };

    if (!content[slug as keyof typeof content]) {
        notFound();
    }

    return content[slug as keyof typeof content];
}
