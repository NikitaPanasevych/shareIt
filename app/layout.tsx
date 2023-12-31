import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './globals.css';
import { Setup } from '@/components/Setup';

export const metadata = {
    title: 'Share It',
    description: 'Share and learn from others'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Setup />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
