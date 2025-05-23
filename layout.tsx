import './globals.css';
export const metadata = {
  title: 'Shiba Board Game',
  description: 'A cute Shiba Inu board game!',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}