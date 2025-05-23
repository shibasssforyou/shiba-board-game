export const metadata = {
  title: "Shiba Board Game",
  description: "Play a cute shiba-themed board game!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}


