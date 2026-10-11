
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
}

function ProfileField({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 break-words font-medium">
        {value || "Not provided"}
      </dd>
    </div>
  );
}

function ProfilePage() {
  const { user, loading, refreshUser, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");
    setSuccess("");

    try {
      await refreshUser();

      // AuthContext owns the actual user state. This message confirms
      // the refresh action completed, not a profile update.
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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="mt-6" role="status">
          Loading your profile…
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="mt-4" role="alert">
          Your profile is unavailable. Please sign in again.
        </p>
        <Link to="/login" className="mt-4 inline-block underline">
          Go to login
        </Link>
      </main>
    );
  }

  const addresses = Array.isArray(user.addresses)
    ? user.addresses
    : [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="mt-1 text-sm text-gray-600">
            View your account information and saved addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? "Refreshing…" : "Refresh profile"}
        </button>
      </div>

      {error && (
        <div
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <p
          className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          role="status"
        >
          {success}
        </p>
      )}

      <section className="mt-6 rounded-xl border p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Account information</h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <ProfileField label="Full name" value={user.name} />
          <ProfileField label="Email address" value={user.email} />
          <ProfileField
            label="Account role"
            value={
              user.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : undefined
            }
          />
          <ProfileField
            label="Member since"
            value={formatDate(user.createdAt)}
          />
        </dl>

        <p className="mt-5 text-sm text-gray-500">
          Profile editing is not available until the backend provides
          an authenticated update endpoint.
        </p>
      </section>

      <section className="mt-6 rounded-xl border p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Saved addresses</h2>
          <span className="text-sm text-gray-500">
            {addresses.length} saved
          </span>
        </div>

        {addresses.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">
            You don't have any saved addresses yet. The address entered
            during checkout is stored with that order and is not
            automatically added to your profile.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {addresses.map((address, index) => (
              <article
                key={address._id || index}
                className="rounded-lg bg-gray-50 p-4"
              >
                <p className="font-medium">
                  {address.label || address.fullName || `Address ${index + 1}`}
                </p>

                {address.fullName && (
                  <p className="mt-1">{address.fullName}</p>
                )}

                {address.phone && (
                  <p className="text-sm text-gray-600">
                    {address.phone}
                  </p>
                )}

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {[
                    address.addressLine,
                    address.city,
                    address.state,
                    address.postalCode,
                    address.country
                  ]
                    .filter(Boolean)
                    .join(", ") || "Address details unavailable"}
                </p>
              </article>
            ))}
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500">
          Address management depends on the user API. This page
          currently displays saved addresses only.
        </p>
      </section>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/orders" className="underline">
          My Orders
        </Link>

        <Link to="/cart" className="underline">
          View Cart
        </Link>
      </div>
    </main>
  );
}

export default ProfilePage;

