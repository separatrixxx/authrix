import Link from 'next/link';


export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/docs/introduction">Introduction</Link>
        </li>
        <li>
          <Link href="/docs/service-registration">Service Registration</Link>
        </li>
        <li>
          <Link href="/docs/widget">Widget</Link>
        </li>
      </ul>
    </nav>
  );
}
