export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dirt-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gold-400 mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dirt-900 font-bold rounded-lg transition-colors"
        >
          Go Home ⛏️
        </a>
      </div>
    </div>
  );
}

