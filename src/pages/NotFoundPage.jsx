import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                404
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
                Page not found
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
                The page you are looking for does not exist.
            </p>

            <Link to="/" className="mt-8 inline-flex rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
                Back to Home
            </Link>
        </div>
    </section>
  );
}

export default NotFoundPage;