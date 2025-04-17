"use client";

import {useState} from 'react';
import {contextualTranslation} from '@/ai/flows/contextual-translation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const surahs = [
  {label: 'Al-Fatiha (The Opening)', value: '1'},
  {label: 'Al-Baqarah (The Cow)', value: '2'},
  {label: 'Aal-Imran (The Family of Imran)', value: '3'},
  {label: 'An-Nisa (The Women)', value: '4'},
  {label: 'Al-Maidah (The Table Spread)', value: '5'},
  {label: 'Al-Anam (The Cattle)', value: '6'},
  {label: 'Al-Araf (The Heights)', value: '7'},
  {label: 'Al-Anfal (The Spoils of War)', value: '8'},
  {label: 'At-Taubah (The Repentance)', value: '9'},
  {label: 'Yunus (Jonah)', value: '10'},
  {label: 'Hud (Hud)', value: '11'},
  {label: 'Yusuf (Joseph)', value: '12'},
  {label: 'Ar-Rad (The Thunder)', value: '13'},
  {label: 'Ibrahim (Abraham)', value: '14'},
  {label: 'Al-Hijr (The Rocky Tract)', value: '15'},
  {label: 'An-Nahl (The Bee)', value: '16'},
  {label: 'Al-Isra (The Night Journey)', value: '17'},
  {label: 'Al-Kahf (The Cave)', value: '18'},
  {label: 'Maryam (Mary)', value: '19'},
  {label: 'Ta-Ha (Ta-Ha)', value: '20'},
  {label: 'Al-Anbiya (The Prophets)', value: '21'},
  {label: 'Al-Hajj (The Pilgrimage)', value: '22'},
  {label: 'Al-Muminun (The Believers)', value: '23'},
  {label: 'An-Nur (The Light)', value: '24'},
  {label: 'Al-Furqan (The Criterion)', value: '25'},
  {label: 'Ash-Shuara (The Poets)', value: '26'},
  {label: 'An-Naml (The Ant)', value: '27'},
  {label: 'Al-Qasas (The Stories)', value: '28'},
  {label: 'Al-Ankabut (The Spider)', value: '29'},
  {label: 'Ar-Rum (The Romans)', value: '30'},
  {label: 'Luqman (Luqman)', value: '31'},
  {label: 'As-Sajdah (The Prostration)', value: '32'},
  {label: 'Al-Ahzab (The Combined Forces)', value: '33'},
  {label: 'Saba (Sheba)', value: '34'},
  {label: 'Fatir (Originator)', value: '35'},
  {label: 'Ya-Sin (Ya-Sin)', value: '36'},
  {label: 'As-Saffat (Those who set the ranks)', value: '37'},
  {label: 'Sad (Sad)', value: '38'},
  {label: 'Az-Zumar (The Troops)', value: '39'},
  {label: 'Ghafir (The Forgiver)', value: '40'},
  {label: 'Fussilat (Explained in Detail)', value: '41'},
  {label: 'Ash-Shura (The Consultation)', value: '42'},
  {label: 'Az-Zukhruf (The Ornaments of Gold)', value: '43'},
  {label: 'Ad-Dukhan (The Smoke)', value: '44'},
  {label: 'Al-Jathiyah (The Crouching)', value: '45'},
  {label: 'Al-Ahqaf (The Wind-Curved Sandhills)', value: '46'},
  {label: 'Muhammad (Muhammad)', value: '47'},
  {label: 'Al-Fath (The Victory)', value: '48'},
  {label: 'Al-Hujurat (The Rooms)', value: '49'},
  {label: 'Qaf (Qaf)', value: '50'},
  {label: 'Adh-Dhariyat (The Winnowing Winds)', value: '51'},
  {label: 'At-Tur (The Mount)', value: '52'},
  {label: 'An-Najm (The Star)', value: '53'},
  {label: 'Al-Qamar (The Moon)', value: '54'},
  {label: 'Ar-Rahman (The Most Gracious)', value: '55'},
  {label: 'Al-Waqiah (The Inevitable)', value: '56'},
  {label: 'Al-Hadid (The Iron)', value: '57'},
  {label: 'Al-Mujadila (The Pleading Woman)', value: '58'},
  {label: 'Al-Hashr (The Gathering)', value: '59'},
  {label: 'Al-Mumtahanah (The Woman to be examined)', value: '60'},
  {label: 'As-Saff (The Row)', value: '61'},
  {label: 'Al-Jumuah (The Congregation)', value: '62'},
  {label: 'Al-Munafiqun (The Hypocrites)', value: '63'},
  {label: 'At-Taghabun (The Loss and Gain)', value: '64'},
  {label: 'At-Talaq (The Divorce)', value: '65'},
  {label: 'At-Tahrim (The Prohibition)', value: '66'},
  {label: 'Al-Mulk (The Kingdom)', value: '67'},
  {label: 'Al-Qalam (The Pen)', value: '68'},
  {label: 'Al-Haqqah (The Reality)', value: '69'},
  {label: 'Al-Maarij (The Ways of Ascent)', value: '70'},
  {label: 'Nuh (Noah)', value: '71'},
  {label: 'Al-Jinn (The Jinn)', value: '72'},
  {label: 'Al-Muzzammil (The Enshrouded One)', value: '73'},
  {label: 'Al-Muddaththir (The Cloaked One)', value: '74'},
  {label: 'Al-Qiyamah (The Resurrection)', value: '75'},
  {label: 'Al-Insan (The Man)', value: '76'},
  {label: 'Al-Mursalat (Those sent forth)', value: '77'},
  {label: 'An-Naba (The Tidings)', value: '78'},
  {label: 'An-Naziat (Those who drag forth)', value: '79'},
  {label: 'Abasa (He frowned)', value: '80'},
  {label: 'At-Takwir (The Overthrowing)', value: '81'},
  {label: 'Al-Infitar (The Cleaving)', value: '82'},
  {label: 'Al-Mutaffifin (Those who deal in fraud)', value: '83'},
  {label: 'Al-Inshiqaq (The Bursting Forth)', value: '84'},
  {label: 'Al-Buruj (The Constellations)', value: '85'},
  {label: 'At-Tariq (The Nightcomer)', value: '86'},
  {label: 'Al-Ala (The Most High)', value: '87'},
  {label: 'Al-Ghashiyah (The Overwhelming)', value: '88'},
  {label: 'Al-Fajr (The Dawn)', value: '89'},
  {label: 'Al-Balad (The City)', value: '90'},
  {label: 'Ash-Shams (The Sun)', value: '91'},
  {label: 'Al-Layl (The Night)', value: '92'},
  {label: 'Ad-Duha (The Forenoon)', value: '93'},
  {label: 'Ash-Sharh (The Relief)', value: '94'},
  {label: 'At-Tin (The Fig)', value: '95'},
  {label: 'Al-Alaq (The Clot)', value: '96'},
  {label: 'Al-Qadr (The Power)', value: '97'},
  {label: 'Al-Bayyinah (The Clear Proof)', value: '98'},
  {label: 'Az-Zalzalah (The Earthquake)', value: '99'},
  {label: 'Al-Adiyat (Those that run)', value: '100'},
  {label: 'Al-Qariah (The Calamity)', value: '101'},
  {label: 'At-Takathur (The Multiplication of Wealth)', value: '102'},
  {label: 'Al-Asr (The Time)', value: '103'},
  {label: 'Al-Humazah (The Slanderer)', value: '104'},
  {label: 'Al-Fil (The Elephant)', value: '105'},
  {label: 'Quraish (Quraish)', value: '106'},
  {label: 'Al-Maun (The Small Kindnesses)', value: '107'},
  {label: 'Al-Kauthar (A River in Paradise)', value: '108'},
  {label: 'Al-Kafirun (The Disbelievers)', value: '109'},
  {label: 'An-Nasr (The Help)', value: '110'},
  {label: 'Al-Masad (The Palm Fiber)', value: '111'},
  {label: 'Al-Ikhlas (The Sincerity)', value: '112'},
  {label: 'Al-Falaq (The Daybreak)', value: '113'},
  {label: 'An-Nas (The Mankind)', value: '114'},
];

const versesInSurah = (surah: string): { label: string; value: string }[] => {
  const numVerses = getVerseCount(surah);
  return Array.from({length: numVerses}, (_, i) => ({
    label: `Verse ${i + 1}`,
    value: `${i + 1}`,
  }));
};

const getVerseCount = (surah: string): number => {
  switch (surah) {
    case '1': return 7;   // Al-Fatiha
    case '2': return 286; // Al-Baqarah
    case '3': return 200; // Aal-Imran
    case '4': return 176; // An-Nisa
    case '5': return 120; // Al-Maidah
    case '6': return 165; // Al-Anam
    case '7': return 206; // Al-Araf
    case '8': return 75;  // Al-Anfal
    case '9': return 129; // At-Taubah
    case '10': return 109; // Yunus
    case '11': return 123; // Hud
    case '12': return 111; // Yusuf
    case '13': return 43;  // Ar-Rad
    case '14': return 52;  // Ibrahim
    case '15': return 99;  // Al-Hijr
    case '16': return 128; // An-Nahl
    case '17': return 111; // Al-Isra
    case '18': return 110; // Al-Kahf
    case '19': return 98;  // Maryam
    case '20': return 135; // Ta-Ha
    case '21': return 112; // Al-Anbiya
    case '22': return 78;  // Al-Hajj
    case '23': return 118; // Al-Muminun
    case '24': return 64;  // An-Nur
    case '25': return 77;  // Al-Furqan
    case '26': return 227; // Ash-Shuara
    case '27': return 93;  // An-Naml
    case '28': return 88;  // Al-Qasas
    case '29': return 69;  // Al-Ankabut
    case '30': return 60;  // Ar-Rum
    case '31': return 34;  // Luqman
    case '32': return 30;  // As-Sajdah
    case '33': return 73;  // Al-Ahzab
    case '34': return 54;  // Saba
    case '35': return 45;  // Fatir
    case '36': return 83;  // Ya-Sin
    case '37': return 182; // As-Saffat
    case '38': return 88;  // Sad
    case '39': return 75;  // Az-Zumar
    case '40': return 85;  // Ghafir
    case '41': return 54;  // Fussilat
    case '42': return 53;  // Ash-Shura
    case '43': return 89;  // Az-Zukhruf
    case '44': return 59;  // Ad-Dukhan
    case '45': return 37;  // Al-Jathiyah
    case '46': return 35;  // Al-Ahqaf
    case '47': return 38; // Muhammad
    case '48': return 29;  // Al-Fath
    case '49': return 18;  // Al-Hujurat
    case '50': return 45;  // Qaf
    case '51': return 60; // Adh-Dhariyat
    case '52': return 49;  // At-Tur
    case '53': return 62; // An-Najm
    case '54': return 55;  // Al-Qamar
    case '55': return 78; // Ar-Rahman
    case '56': return 96; // Al-Waqiah
    case '57': return 29; // Al-Hadid
    case '58': return 22; // Al-Mujadila
    case '59': return 24; // Al-Hashr
    case '60': return 13; // Al-Mumtahanah
    case '61': return 14;  // As-Saff
    case '62': return 11;  // Al-Jumuah
    case '63': return 11; // Al-Munafiqun
    case '64': return 18; // At-Taghabun
    case '65': return 12; // At-Talaq
    case '66': return 12; // At-Tahrim
    case '67': return 30; // Al-Mulk
    case '68': return 52;  // Al-Qalam
    case '69': return 52; // Al-Haqqah
    case '70': return 44;  // Al-Maarij
    case '71': return 28; // Nuh
    case '72': return 28; // Al-Jinn
    case '73': return 20;  // Al-Muzzammil
    case '74': return 56; // Al-Muddaththir
    case '75': return 40; // Al-Qiyamah
    case '76': return 31; // Al-Insan
    case '77': return 50; // Al-Mursalat
    case '78': return 40; // An-Naba
    case '79': return 46;  // An-Naziat
    case '80': return 42; // Abasa
    case '81': return 29; // At-Takwir
    case '82': return 19;  // Al-Infitar
    case '83': return 36; // Al-Mutaffifin
    case '84': return 25;  // Al-Inshiqaq
    case '85': return 22;  // Al-Buruj
    case '86': return 17;  // At-Tariq
    case '87': return 19; // Al-Ala
    case '88': return 26;  // Al-Ghashiyah
    case '89': return 30;  // Al-Fajr
    case '90': return 20; // Al-Balad
    case '91': return 15;  // Ash-Shams
    case '92': return 21;  // Al-Layl
    case '93': return 11;  // Ad-Duha
    case '94': return 8;   // Ash-Sharh
    case '95': return 8;   // At-Tin
    case '96': return 19; // Al-Alaq
    case '97': return 5;   // Al-Qadr
    case '98': return 8;   // Al-Bayyinah
    case '99': return 8;   // Az-Zalzalah
    case '100': return 11; // Al-Adiyat
    case '101': return 11; // Al-Qariah
    case '102': return 8;  // At-Takathur
    case '103': return 3;  // Al-Asr
    case '104': return 9;   // Al-Humazah
    case '105': return 5;  // Al-Fil
    case '106': return 4;   // Quraish
    case '107': return 7; // Al-Maun
    case '108': return 3;  // Al-Kauthar
    case '109': return 6; // Al-Kafirun
    case '110': return 3;  // An-Nasr
    case '111': return 5; // Al-Masad
    case '112': return 4; // Al-Ikhlas
    case '113': return 5;   // Al-Falaq
    case '114': return 6;   // An-Nas
    default:    return 0;
  }
};


export function QuranVerse() {
  const [surah, setSurah] = useState<string>('1');
  const [verse, setVerse] = useState<string>('1');
  const [commentary, setCommentary] = useState('');
  const [hadith, setHadith] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const verseOptions = versesInSurah(surah);

  const handleTranslation = async () => {
    const verseText = `Surah ${surah}, Verse ${verse}`; // Construct verse text
    const result = await contextualTranslation({
      verse: verseText,
      commentary: commentary,
      hadith: hadith,
    });
    setTranslatedText(result?.translation || 'Translation not available.');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full py-12">
      {/* Surah Selection */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Surah</CardTitle>
            <CardDescription>Select the Surah</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSurah} defaultValue={surah}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Surah"/>
              </SelectTrigger>
              <SelectContent>
                {surahs.map((surah) => (
                  <SelectItem key={surah.value} value={surah.value}>
                    {surah.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Verse Selection */}
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Verse</CardTitle>
            <CardDescription>Select the Verse</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setVerse} defaultValue={verse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Verse"/>
              </SelectTrigger>
              <SelectContent>
                {verseOptions.map((verse) => (
                  <SelectItem key={verse.value} value={verse.value}>
                    {verse.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
