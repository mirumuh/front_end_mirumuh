'use client'; // Esse arquivo será um Client Component

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login"; 

  return (
    <>
      {!isLoginPage && <Header />}
      {children}
    </>
  );
}
