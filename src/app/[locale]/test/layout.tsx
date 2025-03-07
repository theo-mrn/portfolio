export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="test-layout">
      {children}
    </div>
  )
}
