
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function getInitials(name) {
  if (!name?.trim()) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function ProfileField({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7C8677]">
        {label}
      </dt>
      <dd className="mt-2 break-words text-sm font-medium text-[#293C2D] sm:text-base">
        {value || "Not provided"}
      </dd>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66805D]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-[#244B31]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-6 text-[#737B6F]">
          {description}
        </p>
      )}
    </div>
  );
}

function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");
    setSuccess("");

    try {
      await refreshUser();
      setSuccess("Your profile information has been refreshed.");
    } catch (err) {
      setError(
        err?.message || "Unable to refresh your profile. Please try again."
      );
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-[#FAF9F4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-4 w-32 rounded bg-[#E5E8DC]" />
          <div className="mt-5 h-10 w-64 rounded bg-[#E5E8DC]" />
          <div className="mt-8 h-48 rounded-3xl bg-[#E5E8DC]" />
          <div className="mt-5 h-64 rounded-3xl bg-[#E5E8DC]" />
          <p className="mt-5 text-sm text-[#657366]" role="status">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[60vh] bg-[#FAF9F4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#E6E6DA] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF1E6] text-2xl">
            🌿
          </div>
          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#244B31]">
            Your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#737B6F]" role="alert">
            Your profile is unavailable. Please sign in again to view your
            account information.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  const addresses = Array.isArray(user.addresses) ? user.addresses : [];

  const role = user.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Customer";

  return (
    <main className="min-h-screen bg-[#FAF9F4] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-sm text-[#7C8677]"
        >
          <Link
            to="/"
            className="transition hover:text-[#245333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
          >
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-[#315B3C]" aria-current="page">
            My Account
          </span>
        </nav>

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#66805D]">
              Your Root & Leaf account
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#244B31] sm:text-5xl">
              My Account
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#737B6F] sm:text-base">
              Manage your account information, revisit your orders, and find
              your saved delivery details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-[#D5DDCF] bg-white px-5 py-3 text-sm font-semibold text-[#315B3C] transition hover:bg-[#EDF1E6] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            >
              <path d="M20 7v5h-5" />
              <path d="M4 17v-5h5" />
              <path d="M5.6 9A7 7 0 0 1 18 6l2 6" />
              <path d="M18.4 15A7 7 0 0 1 6 18l-2-6" />
            </svg>
            {refreshing ? "Refreshing..." : "Refresh profile"}
          </button>
        </div>

        {/* Feedback */}
        {error && (
          <div
            className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mt-6 rounded-2xl border border-[#D6E4D0] bg-[#EDF5E9] p-4 text-sm text-[#315B3C]"
            role="status"
          >
            {success}
          </div>
        )}

        {/* Profile hero */}
        <section className="relative mt-8 overflow-hidden rounded-3xl bg-[#244B31] p-6 text-white shadow-sm sm:p-9 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-10 h-48 w-48 rounded-full border border-white/10 sm:h-64 sm:w-64"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              aria-label={`Profile initials: ${getInitials(user.name)}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#E9E8D6] font-serif text-3xl font-semibold text-[#245333] shadow-inner sm:h-24 sm:w-24 sm:text-4xl"
            >
              {getInitials(user.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4E1C8]">
                Welcome back
              </p>
              <h2 className="mt-2 break-words font-serif text-3xl font-semibold sm:text-4xl">
                {user.name || "Valued Customer"}
              </h2>
              <p className="mt-2 break-words text-sm text-white/75 sm:text-base">
                {user.email || "Email not provided"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                  <span className="h-2 w-2 rounded-full bg-[#C5DDAE]" />
                  {role} account
                </span>
                <span className="text-xs text-white/65">
                  Member since {formatDate(user.createdAt)}
                </span>
              </div>
            </div>

            <div className="hidden shrink-0 text-5xl opacity-80 sm:block">
              🌿
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="mt-8">
          <SectionHeading
            eyebrow="Quick access"
            title="Your shopping, in one place"
            description="Pick up where you left off."
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              to="/orders"
              className="group flex items-center gap-4 rounded-2xl border border-[#E6E6DA] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#CAD7C2] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EDF1E6] text-[#315B3C]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path d="M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2Z" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#244B31]">
                  My Orders
                </h3>
                <p className="mt-1 text-sm leading-5 text-[#737B6F]">
                  View purchases and track order status.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="text-xl text-[#78906E] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              to="/cart"
              className="group flex items-center gap-4 rounded-2xl border border-[#E6E6DA] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#CAD7C2] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4EEDF] text-[#80683B]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#244B31]">
                  View Cart
                </h3>
                <p className="mt-1 text-sm leading-5 text-[#737B6F]">
                  Review your selected products before checkout.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="text-xl text-[#78906E] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Account information */}
        <section className="mt-8 rounded-3xl border border-[#E6E6DA] bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            eyebrow="Personal details"
            title="Account information"
            description="Your registered account details."
          />

          <dl className="mt-7 grid gap-x-8 gap-y-7 border-t border-[#ECEDE4] pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileField label="Full name" value={user.name} />
            <ProfileField label="Email address" value={user.email} />
            <ProfileField label="Account role" value={role} />
            <ProfileField
              label="Member since"
              value={formatDate(user.createdAt)}
            />
          </dl>

          <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[#F7F7F0] p-4">
            <span aria-hidden="true" className="text-lg">
              ℹ️
            </span>
            <p className="text-sm leading-6 text-[#737B6F]">
              Need to change your account details? Profile editing is not
              currently available through the existing backend.
            </p>
          </div>
        </section>

        {/* Saved addresses */}
        <section className="mt-8 rounded-3xl border border-[#E6E6DA] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Delivery information"
              title="Saved addresses"
              description="Addresses associated with your account."
            />

            <span className="inline-flex w-fit items-center rounded-full bg-[#EDF1E6] px-3 py-1.5 text-xs font-semibold text-[#315B3C]">
              {addresses.length}{" "}
              {addresses.length === 1 ? "address" : "addresses"}
            </span>
          </div>

          {addresses.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-[#D8DFD0] bg-[#FAFAF6] px-5 py-10 text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF1E6] text-2xl"
              >
                📍
              </div>
              <h3 className="mt-4 font-semibold text-[#244B31]">
                No saved addresses yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737B6F]">
                The address you enter during checkout is saved with that
                order. It is not automatically added to your profile.
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full border border-[#D5DDCF] px-5 py-2.5 text-sm font-semibold text-[#315B3C] transition hover:bg-[#EDF1E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
              >
                Explore products
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {addresses.map((address, index) => {
                const addressLines = [
                  address.addressLine,
                  address.city,
                  address.state,
                  address.postalCode,
                  address.country,
                ].filter(Boolean);

                return (
                  <article
                    key={address._id || index}
                    className="rounded-2xl border border-[#E6E6DA] bg-[#FCFCF8] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF1E6] text-[#315B3C]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-5 w-5"
                        >
                          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-semibold text-[#244B31]">
                          {address.label ||
                            address.fullName ||
                            `Address ${index + 1}`}
                        </h3>

                        {address.fullName && address.label && (
                          <p className="mt-1 text-sm text-[#737B6F]">
                            {address.fullName}
                          </p>
                        )}

                        {address.phone && (
                          <p className="mt-2 text-sm text-[#737B6F]">
                            {address.phone}
                          </p>
                        )}

                        <p className="mt-3 text-sm leading-6 text-[#536253]">
                          {addressLines.join(", ") ||
                            "Address details unavailable"}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <p className="mt-5 text-xs leading-5 text-[#8A9085]">
            Saved-address management is not available on this page yet.
          </p>
        </section>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#E5E6DC] pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[#737B6F]">
            Thank you for choosing a more natural way of living.
          </p>
          <Link
            to="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Continue shopping
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
