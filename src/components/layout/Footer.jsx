import { Link } from "react-router-dom";

const linkClass =
  "rounded-sm transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]";

const Footer = () => {
  const exploreLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
    { to: "/faq", label: "FAQs" },
    { to: "/shipping-returns", label: "Shipping & Returns" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms & Conditions" },
    { to: "/products", label: "Shop All Products" },
    { to: "/cart", label: "Shopping Cart" },
  ];

  const exploreColumns = [
    exploreLinks.slice(0, 5),
    exploreLinks.slice(5),
  ];

  return (
    <footer className="border-t border-[#DDE3D6] bg-[#F0F1E7] text-[#435443]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-10">
        {/* Brand introduction */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="inline-block rounded-sm font-serif text-2xl font-semibold tracking-tight text-[#244B31] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Root &amp; Leaf
          </Link>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#697767]">
            A thoughtful place to discover organic-inspired products,
            everyday essentials, and simple ways to bring nature into
            your daily routine.
          </p>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[#71806D]">
            Naturally, every day.
          </p>
        </div>

        {/* Explore links in two columns */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold text-[#294B32]">
            Explore
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-x-4 sm:gap-x-6">
            {exploreColumns.map((column, columnIndex) => (
              <ul
                key={columnIndex}
                className="space-y-3 text-sm"
              >
                {column.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Account and admin links */}
        <div>
          <h2 className="font-semibold text-[#294B32]">
            Your Account
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/login" className={linkClass}>
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/register" className={linkClass}>
                Create an Account
              </Link>
            </li>
            <li>
              <Link to="/orders" className={linkClass}>
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-sm font-medium text-[#294B32] transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                </svg>
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#DDE3D6]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#788273] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} Root &amp; Leaf.
            All rights reserved.
          </p>

          <p>Thoughtfully chosen. Naturally inspired.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;