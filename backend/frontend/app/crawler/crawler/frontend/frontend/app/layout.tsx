export const metadata = {
  title: '판촉물 최저가 비교',
  description: '실시간 B2B 판촉물 가격 비교',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
