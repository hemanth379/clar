import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      background: '#fafafa',
      color: '#111',
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ── NAVBAR ─────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,250,250,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #f0f0f0',
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
              textDecoration: 'none', padding: '7px 14px',
              borderRadius: 8, transition: 'all 0.15s',
            }}>Sign in</Link>
            <Link href="/register" style={{
              fontSize: 13.5, fontWeight: 600, color: 'white',
              background: '#4f46e5', textDecoration: 'none',
              padding: '8px 18px', borderRadius: 9,
            }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        textAlign: 'center',
        padding: '88px 24px 72px',
        maxWidth: 760, margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, color: '#4f46e5',
          background: '#eef2ff', border: '1px solid #c7d2fe',
          padding: '5px 13px', borderRadius: 20, marginBottom: 32,
          letterSpacing: '0.2px',
        }}>
          ✦ AI-powered task management
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 500,
          letterSpacing: '-1px',
          lineHeight: 1.15,
          color: '#0a0a0a',
          marginBottom: 20,
        }}>
          Stop managing tasks.<br />
          <span style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Start finishing them.
          </span>
        </h1>

        <p style={{
          fontSize: 17, fontWeight: 400, lineHeight: 1.7,
          color: '#666', maxWidth: 500, margin: '0 auto 36px',
        }}>
          Describe what you need to do in plain English.
          Clar structures it automatically — date, priority, action steps.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Link href="/register" style={{
            fontSize: 14, fontWeight: 600, color: 'white',
            background: '#4f46e5', textDecoration: 'none',
            padding: '11px 22px', borderRadius: 10,
          }}>Create free account →</Link>
          <Link href="/login" style={{
            fontSize: 14, fontWeight: 500, color: '#666',
            textDecoration: 'none', padding: '11px 18px', borderRadius: 10,
          }}>Sign in</Link>
        </div>

        {/* Demo card */}
        <div style={{
          maxWidth: 580, margin: '52px auto 0',
          background: 'white', border: '1px solid #e8e8e8',
          borderRadius: 16, padding: '24px 28px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
            You type
          </div>
          <div style={{
            fontSize: 14, color: '#888', fontStyle: 'italic',
            background: '#f8f8f8', border: '1px solid #efefef',
            borderRadius: 8, padding: '10px 14px', marginBottom: 16,
          }}>
            "submit project report next Friday at 9am"
          </div>
          <div style={{ fontSize: 12, color: '#ccc', textAlign: 'center', marginBottom: 14 }}>
            ↓ Clar structures it
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#f5f3ff', border: '1px solid #ddd6fe',
            borderRadius: 9, padding: '12px 16px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4f46e5', flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#111', flex: 1 }}>
              Submit project report
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#4338ca', background: '#e0e7ff', padding: '3px 8px', borderRadius: 5 }}>
              Fri · 9am
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#b45309', background: '#fef3c7', padding: '3px 8px', borderRadius: 5 }}>
              High
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────── */}
      <section style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '80px 40px',
      }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 12 }}>
            Everything you need
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, letterSpacing: '-0.8px', color: '#0a0a0a', lineHeight: 1.2, marginBottom: 12 }}>
            Built for people who<br />want to get things done
          </h2>
          <p style={{ fontSize: 15.5, color: '#777', lineHeight: 1.65, maxWidth: 440 }}>
            Not for people who want to spend their day organising a task system.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Large card — AI */}
          <div style={{
            gridColumn: 'span 2',
            background: 'white', border: '1px solid #e8e8e8',
            borderRadius: 16, padding: '36px 40px',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 48, alignItems: 'center',
          }}>
            <div>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#eef2ff', border: '1px solid #e0e7ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, marginBottom: 18,
              }}>✦</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 10, letterSpacing: '-0.2px' }}>
                Natural language task creation
              </h3>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>
                Just describe what needs to be done. Clar parses your input,
                extracts the date, sets the priority, and generates a clear
                action plan — all in under a second. No dropdowns. No forms. No friction.
              </p>
            </div>
            <div style={{ background: '#f8f8f8', borderRadius: 12, padding: 20, border: '1px solid #efefef' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12 }}>
                AI parsed result
              </div>
              {[
                { title: 'Submit project report', date: 'Fri', color: '#4f46e5' },
                { title: 'Review pull requests', date: 'Today', color: '#f59e0b' },
                { title: 'Call dentist', date: 'Mon', color: '#d1d5db' },
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', marginBottom: 6,
                  background: 'white', border: '1px solid #efefef',
                  borderRadius: 8,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#111', flex: 1 }}>{t.title}</span>
                  <span style={{ fontSize: 11.5, color: '#aaa' }}>{t.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Views card */}
          <div style={{ background: 'white', border: '1px solid #e8e8e8', borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, marginBottom: 18 }}>⊞</div>
            <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#111', marginBottom: 8, letterSpacing: '-0.2px' }}>Three ways to see your work</h3>
            <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65, marginBottom: 20 }}>Switch between views depending on what you need.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '☰', name: 'List', desc: 'Fast scanning, clean rows' },
                { icon: '⊞', name: 'Kanban', desc: 'Drag between columns' },
                { icon: '📅', name: 'Calendar', desc: 'Tasks on a date grid' },
              ].map(v => (
                <div key={v.name} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', background: '#fafafa',
                  border: '1px solid #f0f0f0', borderRadius: 8,
                }}>
                  <span style={{ fontSize: 13, width: 20, textAlign: 'center' }}>{v.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#333', flex: 1 }}>{v.name}</span>
                  <span style={{ fontSize: 12, color: '#aaa' }}>{v.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects card */}
          <div style={{ background: 'white', border: '1px solid #e8e8e8', borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, marginBottom: 18 }}>📂</div>
            <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#111', marginBottom: 8, letterSpacing: '-0.2px' }}>Projects and organisation</h3>
            <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65 }}>
              Group tasks into projects. Keep work, personal, and side projects
              completely separate with their own dedicated spaces.
            </p>
          </div>

          {/* Reminders */}
          <div style={{ background: 'white', border: '1px solid #e8e8e8', borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, marginBottom: 18 }}>🔔</div>
            <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#111', marginBottom: 8, letterSpacing: '-0.2px' }}>Smart reminders</h3>
            <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65 }}>
              Get notified by email or browser when tasks are due.
              Clar surfaces what needs attention before you miss it.
            </p>
          </div>

          {/* Calendar */}
          <div style={{ background: 'white', border: '1px solid #e8e8e8', borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, marginBottom: 18 }}>📅</div>
            <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#111', marginBottom: 8, letterSpacing: '-0.2px' }}>Google Calendar sync</h3>
            <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65 }}>
              Tasks with due dates automatically appear in your Google Calendar.
              Your schedule stays in sync without any extra work.
            </p>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────── */}
      <section style={{
        background: 'white',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        padding: '80px 40px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 12 }}>
            How it works
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, letterSpacing: '-0.8px', color: '#0a0a0a', marginBottom: 10 }}>
            Up and running in minutes
          </h2>
          <p style={{ fontSize: 15, color: '#777', marginBottom: 56 }}>
            No onboarding wizard. No setup checklist. Just sign up and start.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
            {[
              { n: '01', title: 'Create your account', desc: 'Sign up in seconds. Your Inbox project is ready immediately.' },
              { n: '02', title: 'Add your tasks', desc: 'Type naturally or use AI to structure tasks automatically.' },
              { n: '03', title: 'Organise your work', desc: 'Group by project, set priorities, assign due dates.' },
              { n: '04', title: 'Get things done', desc: 'Clar reminds you, syncs your calendar, and stays out of your way.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 700,
                  color: '#4f46e5', background: '#eef2ff', border: '1px solid #c7d2fe',
                  borderRadius: 5, padding: '3px 8px', marginBottom: 14,
                }}>{s.n}</div>
                <h3 style={{ fontSize: 14.5, fontWeight: 600, color: '#111', marginBottom: 8, letterSpacing: '-0.2px' }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: '#888', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CLAR ───────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 12 }}>
          Why Clar
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, letterSpacing: '-0.8px', color: '#0a0a0a', marginBottom: 48 }}>
          Designed around how<br />people actually work
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { value: 'AI-first', label: 'Natural language input — type how you think, not how a form expects.' },
            { value: '3 views', label: 'List, Kanban, Calendar. Switch anytime. Your data stays the same.' },
            { value: 'Real-time', label: 'Every change syncs instantly across all your tabs and devices.' },
          ].map(p => (
            <div key={p.value} style={{
              background: 'white', border: '1px solid #e8e8e8',
              borderRadius: 14, padding: '28px 28px',
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5', marginBottom: 8, letterSpacing: '-0.5px' }}>
                {p.value}
              </div>
              <div style={{ fontSize: 13.5, color: '#888', lineHeight: 1.6 }}>{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────── */}
      <section style={{
        textAlign: 'center',
        padding: '80px 24px 100px',
        maxWidth: 560, margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: 'clamp(30px, 4vw, 46px)',
          fontWeight: 600, letterSpacing: '-1px',
          color: '#0a0a0a', lineHeight: 1.15, marginBottom: 16,
        }}>
          Ready for a<br />
          <span style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>clearer workflow?</span>
        </h2>
        <p style={{ fontSize: 16, color: '#777', marginBottom: 32, lineHeight: 1.65 }}>
          Create your free account and start finishing what you started.
        </p>
        <Link href="/register" style={{
          display: 'inline-block', fontSize: 14.5, fontWeight: 600,
          color: 'white', background: '#4f46e5', textDecoration: 'none',
          padding: '13px 28px', borderRadius: 11,
        }}>
          Create free account →
        </Link>
        <p style={{ fontSize: 12, color: '#ccc', marginTop: 14 }}>
          Free forever. No credit card required.
        </p>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid #f0f0f0',
        padding: '28px 40px',
        maxWidth: 1080, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 7,
          textDecoration: 'none', color: '#111',
          fontSize: 14, fontWeight: 700,
        }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white' }}>✦</div>
          Clar
        </Link>
        <p style={{ fontSize: 13, color: '#ccc' }}>Clarity for your day. Focus for your work.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms'].map(l => (
            <Link key={l} href="#" style={{ fontSize: 13, color: '#bbb', textDecoration: 'none' }}>{l}</Link>
          ))}
          <span style={{ fontSize: 13, color: '#bbb' }}>© 2026 Clar</span>
        </div>
      </footer>

    </div>
  )
}