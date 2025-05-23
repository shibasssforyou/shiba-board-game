export const metadata = {
  title: 'Shiba Board Game',
  description: "Happy Birthday Dad! 🐶🎉",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <h1 style={{ textAlign: 'center', color: 'orange' }}>
          🎉 Happy Birthday, Dad! 🎉
        </h1>
        {children}
      </body>
    </html>
  );
}


