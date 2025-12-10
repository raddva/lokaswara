import { Geist, Inter, Lora, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthStoreProvider from '@/providers/auth-store-provider';
import { cookies } from 'next/headers';
import ReactQueryProvider from '@/providers/react-query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin']
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin']
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const profileCookie = cookiesStore.get('user_profile')?.value;
  let profile = null;

  if (profileCookie) {
    try {
      profile = JSON.parse(profileCookie);
    } catch (e) {
      console.error("Failed to parse user_profile cookie:", e);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${inter.variable} ${playfairDisplay.variable} ${lora.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthStoreProvider profile={profile}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}