"use client";
import {QuranVerse} from '@/components/QuranVerse';
import React, {useState} from 'react';

const backgroundImageURL = 'https://i.pinimg.com/originals/b4/9d/ba/b49dbae3023011bd0f7b53e21939e6ae.jpg';

export default function Home() {
  const currentYear = new Date().getFullYear();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Error loading background image.");
  };

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
          opacity: imageLoaded ? 1 : 0.5,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <img
          src={backgroundImageURL}
          alt=""
          style={{ display: 'none' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {!imageLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#E3F2FD',
            }}
          ></div>
        )}
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
