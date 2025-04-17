import {QuranVerse} from '@/components/QuranVerse';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-E3F2FD">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4 shadow-md rounded-lg px-4 py-2 bg-white/80">
          AL Furqan
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore the Quran with contextual understanding.
        </p>
        <QuranVerse />
      </main>
    </div>
  );
}


