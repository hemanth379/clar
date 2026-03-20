import Link from 'next/link'

export function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(250,250,250,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #f0f0f0',
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '0 40px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', color: '#111',
          fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8,
            background: '#4f46e5', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: 'white', fontWeight: 700,
          }}>✦</div>
          Clar
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/login" style={{
            fontSize: 13.5, fontWeight: 500, color: '#666',
            textDecoration: 'none', padding: '7px 14px', borderRadius: 8,
          }}>Sign in</Link>
          <Link href="/register" style={{
            fontSize: 13.5, fontWeight: 600, color: 'white',
            background: '#4f46e5', textDecoration: 'none',
            padding: '8px 18px', borderRadius: 9,
          }}>Get started</Link>
        </div>
      </div>
    </nav>
  )
}