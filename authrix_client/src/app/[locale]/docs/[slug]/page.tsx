import { PageProps } from './page.props';
import { notFound } from 'next/navigation';
import { IntroductionPage } from '../../../../../page_components/IntroductionPage/IntroductionPage';
import { WidgetPage } from '../../../../../page_components/WidgetPage/WidgetPage';
import { ServicePage } from '../../../../../page_components/ServicePage/ServicePage';
import { CheckPage } from '../../../../../page_components/CheckPage/CheckPage';
import { ExtensionPage } from '../../../../../page_components/ExtensionPage/ExtensionPage';


export default async function DocsSlugPage({ params }: PageProps) {
    const { slug } = await params;

    const content = {
        introduction: <IntroductionPage />,
        'service-registration': <ServicePage />,
        'check-service': <CheckPage />,
        widget: <WidgetPage />,
        extension: <ExtensionPage />,
    };

    if (!content[slug as keyof typeof content]) {
        notFound();
    }

    return content[slug as keyof typeof content];
}
