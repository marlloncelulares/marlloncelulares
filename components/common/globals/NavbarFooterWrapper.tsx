'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function NavbarFooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isSpecialPath =
    pathname.startsWith('/limpeza-gratuita') ||
    pathname.startsWith('/quiz-claudinho');

  return (
    <>
      <div className="flex-grow">
        {/* Exemplo de uso da lógica */}
        {isSpecialPath ? (
          <div>Esta é uma rota especial!</div>
        ) : (
          children
        )}
      </div>
    </>
  );
}
