import { HeaderDocs } from '../../../../components/HeaderComponents/HeaderDocs/HeaderDocs';
import Sidebar from './sidebar';


export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderDocs />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
