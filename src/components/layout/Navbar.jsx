import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  [
    "relative inline-flex items-center py-2 text-sm transition-colors duration-200",
    "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full",
    "after:bg-[#315B3C] after:transition-transform after:duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]",
    isActive
      ? "font-semibold text-[#245333] after:scale-x-100"
      : "font-medium text-[#657366] after:scale-x-0 hover:text-[#245333] hover:after:scale-x-100",
  ].join(" ");

function LeafLogo() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#245333] text-[#F7F3E8] transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-11 sm:w-11"
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
        <path
          d="M20 31V14"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M20 21C10 21 8 14 9 9C17 9 21 14 20 21Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M20 17C20 9 25 6 31 7C31 14 27 18 20 17Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M14 31H27"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    closeMobileMenu();
    logout();
    navigate("/");
  };

  const handleNavigation = () => {
    closeMobileMenu();
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        end
        onClick={handleNavigation}
        className={navLinkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        onClick={handleNavigation}
        className={navLinkClass}
      >
        Shop All
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E5D9] bg-[#FBF8F0]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex min-h-[76px] items-center justify-between gap-3 sm:min-h-[84px]">
          {/* Brand */}
          <Link
            to="/"
            onClick={handleNavigation}
            aria-label="Root and Leaf home"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            <LeafLogo />

            <span className="block">
              <span className="block font-serif text-xl font-semibold leading-tight tracking-tight text-[#244B31] sm:text-2xl">
                Root &amp; Leaf
              </span>
              <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.19em] text-[#788172] min-[380px]:block sm:text-[10px]">
                Naturally, every day
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex lg:gap-9"
          >
            {navLinks}
          </nav>

          {/* Account and cart actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              to="/cart"
              onClick={handleNavigation}
              aria-label="View shopping cart"
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-sm font-medium text-[#435D47] transition-colors hover:bg-[#EEF1E7] hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:px-3"
            >
              <CartIcon />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {!loading && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleNavigation}
                  className="hidden max-w-28 truncate rounded-lg px-2 py-2 text-sm font-medium text-[#435D47] transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] lg:block"
                  title="My account"
                >
                  {user.name || "My Account"}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden rounded-full border border-[#D5DDCF] px-4 py-2.5 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EAF0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : !loading ? (
              <>
                <Link
                  to="/login"
                  onClick={handleNavigation}
                  className="hidden rounded-lg px-2 py-2 text-sm font-medium text-[#435D47] transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:inline-flex"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={handleNavigation}
                  className="hidden rounded-full bg-[#245333] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:inline-flex"
                >
                  Join Us
                </Link>
              </>
            ) : (
              <span
                aria-label="Loading account"
                className="hidden h-9 w-16 animate-pulse rounded-full bg-[#E8E9DE] sm:block"
              />
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DDCF] text-[#315B3C] transition-colors hover:bg-[#EAF0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] md:hidden"
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-[#E8E5D9] py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks}

              {!loading && user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={handleNavigation}
                    className="rounded-lg py-2 text-sm font-medium text-[#435D47] transition-colors hover:text-[#245333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
                  >
                    My Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="self-start rounded-full border border-[#D5DDCF] px-4 py-2.5 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EAF0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
                  >
                    Logout
                  </button>
                </>
              ) : !loading ? (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to="/login"
                    onClick={handleNavigation}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-[#435D47] hover:text-[#245333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={handleNavigation}
                    className="rounded-full bg-[#245333] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
                  >
                    Join Us
                  </Link>
                </div>
              ) : (
                <span
                  aria-label="Loading account"
                  className="h-9 w-24 animate-pulse rounded-full bg-[#E8E9DE]"
                />
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;