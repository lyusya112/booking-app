export const metadata = {
  title: "Beauty Booking",
  description: "Онлайн-запись",
  manifest: "/manifest.json",
  themeColor: "#8edbd5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}