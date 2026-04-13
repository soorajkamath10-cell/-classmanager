export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm px-4">{children}</div>
    </main>
  )
}
