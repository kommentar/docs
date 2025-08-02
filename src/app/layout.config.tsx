import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from './assets/kommentar-logo.png';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={Logo.src} alt='Kommentar Logo' width={25} height={25} />
        <h1 className='text-fd-primary'>Kommentar</h1>
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
