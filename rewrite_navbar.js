const fs = require('fs');
let code = fs.readFileSync('components/shop/ShopNavbar.tsx', 'utf8');

// Remove top bar
code = code.replace(/<div className="bg-\[#3B2416\].*?<\/div>/s, '');

// Change NAV_LINKS
code = code.replace(/const NAV_LINKS = \[.*?\];/s, `const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Orders", href: "/orders" },
  { label: "Contact", href: "/contact" },
];`);

// Replace Desktop Nav
const desktopNavRegex = /\{\/\* Center: Desktop Nav \*\/}.*?(?=\{\/\* Right: Actions \*\/})/s;
const newDesktopNav = `{/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-full border border-border/50 shadow-sm flex-none">
            {NAV_LINKS.map((link) => {
               const isActive = pathname === link.href || (pathname.startsWith('/services') && link.label === 'Services');
               return (
                 <Link
                   key={link.label}
                   href={link.href}
                   className={cn(
                     "px-5 py-2 text-[13px] font-bold rounded-full transition-all duration-300",
                     isActive 
                       ? "bg-primary text-primary-foreground shadow-[0_2px_10px_rgba(249,115,22,0.3)]" 
                       : "text-foreground hover:text-primary hover:bg-muted"
                   )}
                 >
                   {link.label}
                 </Link>
               );
            })}
          </nav>

          `;
code = code.replace(desktopNavRegex, newDesktopNav);

// Replace Right Actions completely up to Mobile toggle
const rightActionsRegex = /\{\/\* Right: Actions \*\/}.*?(?=\{\/\* Mobile toggle \*\/})/s;
const newRightActions = `{/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-3">
             <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-border/50 hover:bg-muted transition-colors">
               <Search className="h-4 w-4" />
             </button>
             
             {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setUserMenuOpen((v) => !v)} className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-border/50 hover:bg-muted transition-colors">
                    <span className="text-xs font-bold uppercase">{user.email[0]}</span>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-border shadow-lg p-1.5 z-50"
                      >
                        <div className="px-3 py-2 mb-1 border-b border-border">
                          <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                          <p className="text-xs font-bold text-primary capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        {dashboardHref && (
                          <Link href={dashboardHref} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                            <Sparkles className="h-3.5 w-3.5" /> Dashboard
                          </Link>
                        )}
                        <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                          My Orders
                        </Link>
                        <div className="my-1 h-px bg-border" />
                        <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                          <LogOut className="h-3.5 w-3.5" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             ) : (
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex h-10 rounded-full text-[13px] font-bold hover:bg-muted transition-colors">
                  <Link href="/login">Sign In</Link>
                </Button>
             )}

             <button onClick={() => router.push("/cart")} className="flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(249,115,22,0.3)]">
               <ShoppingCart className="h-4 w-4" />
               <span className="text-xs font-bold hidden sm:inline-block">{itemCount} items</span>
             </button>

          `;
code = code.replace(rightActionsRegex, newRightActions);

// Fix colors
code = code.replace(/text-\[\#3B2416\]/g, 'text-foreground');
code = code.replace(/text-\[\#D97706\]/g, 'text-primary');
code = code.replace(/bg-\[\#D97706\]/g, 'bg-primary');
code = code.replace(/border-\[\#E9D8A6\]\/[0-9]+/g, 'border-border');

fs.writeFileSync('components/shop/ShopNavbar.tsx', code);
console.log('Navbar rewritten.');
