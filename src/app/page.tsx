"use client";
import {QuranVerse} from '@/components/QuranVerse';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4 shadow-md rounded-lg px-4 py-2 bg-white/80">
          AL Furqan
        </h1>
        <p className="text-lg text-gray-700 mb-8 italic">
          "Illuminating the path with divine wisdom." - Explore the Quran with
          contextual understanding.
        </p>
        <QuranVerse />
      </main>
      <footer className="bg-gray-200 py-2 px-4 rounded shadow mt-4">
        &copy; {currentYear} Aaqib Rashid Mir
      </footer>
    </div>
  );
}


