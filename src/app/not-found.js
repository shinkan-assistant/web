// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
      <main>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          ページが見つかりません
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          お探しのページは存在しないか、移動された可能性があります。
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            className="rounded-lg bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-colors duration-300"
          >
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}