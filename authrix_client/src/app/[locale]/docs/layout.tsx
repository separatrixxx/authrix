import Header from './header';
import Sidebar from './sidebar';


export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
