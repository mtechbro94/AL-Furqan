"use client";

import {useState} from 'react';
import {contextualTranslation} from '@/ai/flows/contextual-translation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function QuranVerse() {
  const [verse, setVerse] = useState('');
  const [translation, setTranslation] = useState('');
  const [commentary, setCommentary] = useState('');
  const [hadith, setHadith] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslation = async () => {
    const result = await contextualTranslation({
      verse: verse,
      commentary: commentary,
      hadith: hadith,
    });
    setTranslatedText(result?.translation || 'Translation not available.');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full py-12">
      {/* Verse Input */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Quranic Verse</CardTitle>
            <CardDescription>Enter the verse you want to translate</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter Quranic Verse"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              className="bg-fafafa text-quran-verse"
            />
          </CardContent>
        </Card>
      </div>

      {/* Commentary Input */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Commentary</CardTitle>
            <CardDescription>Add commentary for context</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter Commentary"
              value={commentary}
              onChange={(e) => setCommentary(e.target.value)}
              className="bg-fafafa text-quran-commentary"
            />
          </CardContent>
        </Card>
      </div>

      {/* Hadith Input */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Hadith</CardTitle>
            <CardDescription>Add relevant Hadith</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter Hadith"
              value={hadith}
              onChange={(e) => setHadith(e.target.value)}
              className="bg-fafafa text-quran-hadith"
            />
          </CardContent>
        </Card>
      </div>

      {/* Translation Output */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Translation</CardTitle>
            <CardDescription>Translated text</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              readOnly
              placeholder="Translated Text"
              value={translatedText}
              className="bg-fafafa text-quran-translation"
            />
            <Button onClick={handleTranslation} className="bg-e3f2fd text-primary-foreground hover:bg-primary">
              Translate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
