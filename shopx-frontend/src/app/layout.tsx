import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata = {
  title: 'ShopX',
  description: 'فروشگاه مدرن با تجربه سریع و روان'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}