import { HeaderDocs } from '../../../../components/DocsHeaderComponents/HeaderDocs/HeaderDocs';
import Sidebar from '../../../../components/DocsComponents/Sidebar/Sidebar';
import { useTranslations } from 'next-intl';


export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Sidebar');

  const translations = {
    introduction: t('introduction'),
    service_registration: t('service_registration'),
    widget: t('widget'),
  };

  return (
    <div>
      <HeaderDocs />
      <div style={{ display: 'flex' }}>
        <Sidebar translations={translations} />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
