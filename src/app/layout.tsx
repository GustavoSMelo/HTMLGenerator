export const metadata = {
  title: 'HTML Generator',
  description: 'Generates HTML files from .csv/.xls files',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
