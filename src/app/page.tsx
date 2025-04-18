"use client";
import {QuranVerse} from '@/components/QuranVerse';
import React, {useEffect, useState} from 'react';

const imageURLs = [
  'https://i.pinimg.com/originals/b4/9d/ba/b49dbae3023011bd0f7b53e21939e6ae.jpg',
  'https://wallpapercave.com/wp/wp7741395.jpg',
  'https://wallpapercave.com/wp/wp7741453.jpg',
  'https://images.unsplash.com/photo-1553028862-58594936461c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlzbGFtaWMlMjBhcnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
  'https://i.pinimg.com/736x/4c/c8/ab/4cc8ab3494e369c580552419ca82d39c.jpg',
  // Add more image URLs here
];

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageURLs.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="dynamic-background"
        style={{
          backgroundImage: `url(${imageURLs[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      ></div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-4 shadow-md rounded-lg px-4 py-2 bg-black/80">
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

