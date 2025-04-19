"use client";
import {QuranVerse} from '@/components/QuranVerse';
import React, {useState} from 'react';

const backgroundImageURL = "https://img.freepik.com/free-vector/blue-wavy-shape-background_1055-2929.jpg?t=st=1745029613~exp=1745033213~hmac=f4296e6c64ef9baae34faca4cf61ab4673325938d6f9ab8e8e9bf37c6460c529&w=826";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="dynamic-background"
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
      </div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-black mb-4 shadow-md rounded-lg px-4 py-2 bg-white/80">
          AL Furqan
        </h1>
        <p className="text-lg text-black mb-8 italic">
          "Illuminating the path with divine wisdom." - Explore the Quran with
          contextual understanding.
        </p>
        <QuranVerse />
      </main>
      <footer className="bg-black/80 py-2 px-4 rounded shadow mt-4 text-white">
        &copy; {currentYear} Aaqib Rashid Mir (WebApp and AI Developer)
      </footer>
    </div>
  );
}

