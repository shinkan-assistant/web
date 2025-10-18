'use client';

export default function SubRootLayout({ Header, NavMenu, children }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="mt-[64px]">
        {NavMenu && 
          <div className="fixed left-0 right-0">
            <NavMenu />
          </div>
        }

        <div className={NavMenu ? "pt-16" : ""}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}