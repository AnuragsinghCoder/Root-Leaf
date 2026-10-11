
import { Link } from "react-router-dom";

const Footer = () => {
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

        {/* Shopping links */}
        <div>
          <h2 className="font-semibold text-[#294B32]">
            Explore
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Shop All Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Account links */}
        <div>
          <h2 className="font-semibold text-[#294B32]">
            Your Account
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                to="/login"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Create an Account
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="transition-colors hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                My Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>

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
