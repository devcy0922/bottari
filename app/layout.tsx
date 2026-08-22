import './globals.css';
import Link from 'next/link';
export const metadata = { title: '보따리', description: '검증된 설문 응답자 모집 마켓플레이스' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body><header><Link href="/" className="brand">보따리</Link><nav><Link href="/">의뢰자</Link><Link href="/respondent">응답자</Link><Link href="/admin">운영</Link></nav></header><main>{children}</main></body></html>;
}
