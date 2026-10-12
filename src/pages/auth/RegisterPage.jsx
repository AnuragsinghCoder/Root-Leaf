
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/profile", { replace: true });
    } catch (error) {
      setError(error.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-2 block w-full rounded-xl border border-[#DADDD1] bg-[#FDFCF8] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 hover:border-[#A9B9A2] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10";

  return (
    <main className="min-h-[75vh] bg-[#FAF8F2] px-4 py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E5E2D7] bg-white shadow-[0_20px_60px_rgba(38,63,43,0.07)] lg:grid-cols-2">
        {/* Brand panel */}
        <section className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-[#263F2B] p-7 text-white sm:p-10 lg:min-h-[680px]">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#78916B]/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative">
            <Link
              to="/"
              aria-label="Root and Leaf home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 font-serif text-xl">
                R
              </span>

              <span>
                <span className="block font-serif text-xl font-semibold tracking-wide">
                  Root & Leaf
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.24em] text-[#D5E0CF]">
                  Naturally thoughtful
                </span>
              </span>
            </Link>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C6D6BC]">
              Begin something good
            </p>

            <h1 className="mt-4 max-w-sm font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Small choices. A more natural way of living.
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
              Create your account to explore thoughtfully selected products,
              keep track of your purchases, and make your next visit easier.
            </p>
          </div>

          <p className="relative mt-8 text-xs text-white/55">
            Thoughtfully chosen. Naturally inspired.
          </p>
        </section>

        {/* Registration form */}
        <section className="flex items-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816A]">
              Join our community
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
              Create account
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              A few details and you&apos;re ready to get started.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#344936]"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#344936]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#344936]"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="block w-full rounded-xl border border-[#DADDD1] bg-[#FDFCF8] px-4 py-3 pr-20 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 hover:border-[#A9B9A2] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-3 rounded-md px-2 text-xs font-semibold text-[#47644B] hover:text-[#263F2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#47644B]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-stone-500">
                  Use at least 6 characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-[#344936]"
                >
                  Confirm password
                </label>

                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    aria-invalid={
                      formData.confirmPassword.length > 0 &&
                      formData.password !== formData.confirmPassword
                    }
                    className="block w-full rounded-xl border border-[#DADDD1] bg-[#FDFCF8] px-4 py-3 pr-20 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 hover:border-[#A9B9A2] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute inset-y-0 right-3 rounded-md px-2 text-xs font-semibold text-[#47644B] hover:text-[#263F2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#47644B]"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {formData.confirmPassword.length > 0 && (
                  <p
                    className={`mt-2 text-xs ${
                      formData.password === formData.confirmPassword
                        ? "text-[#31583B]"
                        : "text-red-600"
                    }`}
                    aria-live="polite"
                  >
                    {formData.password === formData.confirmPassword
                      ? "Passwords match."
                      : "Passwords do not match yet."}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#31583B] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create your account
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#EAE8DF]" />
              <span className="text-xs text-stone-400">ALREADY A MEMBER?</span>
              <div className="h-px flex-1 bg-[#EAE8DF]" />
            </div>

            <p className="text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#31583B] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
