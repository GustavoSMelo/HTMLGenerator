import StyledComponentsRegistry from "./registry"

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
        <body>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
    </html>
  )
}
