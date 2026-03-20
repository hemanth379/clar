import { Navbar } from '@/components/layout/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      background: '#fafafa',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
    }}>
      <Navbar />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        minHeight: 'calc(100vh - 60px)',
      }}>
        {children}
      </div>
    </div>
  )
}