import { Sora } from 'next/font/google';
import Script from 'next/script';
import Image from 'next/image';

import '@/styles/globals.css';

export const metadata = {
  title: 'Marllon Celulares',
};

const font = Sora({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  return (
    <html lang="en">
      <head>
        {facebookPixelId && (
          <>
            {/* Script do Meta Pixel */}
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${facebookPixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            {/* Fallback para navegadores com JavaScript desativado */}
            <noscript>
              <Image
                height={1}
                width={1}
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </head>
      <body className={`${font.className} flex flex-col min-h-screen`}>
            {children}
      </body>
    </html>
  );
}
