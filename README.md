# Guessipe

A culinary twist on the popular word guessing game! Guess the core ingredients of famous dishes in 6 tries or fewer. Made using React, TypeScript, and Tailwind.

## How to Play

1. **See the dish name** displayed at the top (e.g., "PESTO GENOVESE")
2. **Guess ingredients** using the autocomplete input field
3. **Get multi-layered feedback**:
   - 🟩 **Green**: Correct core ingredient!
   - 🟨 **Yellow**: Right category, wrong item OR common substitute
   - ⬜ **Gray**: Not a core ingredient
4. **Fill all ingredient slots** to win!
5. **Share your results** with a spoiler-free emoji grid

[**Try out Guessipe!**](https://guessipe.vercel.app/)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

#### With Bun (recommended):

```bash
$> cd guessipe
$> bun install
$> bun run dev
```

#### With npm:

```bash
$> cd guessipe
$> npm install
$> npm run dev
```

**Note**: This project now uses Vite for much faster development and build times!

### To build/run docker container:

#### Development

```bash
$> docker build -t guessipe:dev -f docker/Dockerfile .
$> docker run -d -p 3000:3000 --name guessipe-dev guessipe:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t guessipe:prod -f docker/Dockerfile .
$> docker run -d -p 80:8080  --name guessipe-prod guessipe:prod
```

Open [http://localhost](http://localhost) in browser.

## Featured Dishes

Guessipe currently includes 10 carefully selected dishes with widely agreed-upon core ingredients:

1. **Pesto Genovese** 🌿 - Classic Italian herb sauce
2. **Margherita Pizza** 🍕 - Traditional Neapolitan pizza
3. **Caesar Salad** 🥗 - Roman salad with rich dressing
4. **Guacamole** 🥑 - Traditional Mexican avocado dip
5. **Hummus** 🧆 - Middle Eastern chickpea spread
6. **Carbonara** 🍝 - Roman pasta with eggs and cured pork
7. **Caprese Salad** 🍅 - Simple Italian tomato and mozzarella
8. **Greek Salad** 🫒 - Mediterranean village salad
9. **Classic Chili** 🌶️ - Hearty American stew
10. **French Omelette** 🥚 - Classic French egg preparation

## Game Features

- **Intelligent Feedback System**: Beyond simple right/wrong, get category hints and substitute suggestions
- **Autocomplete Input**: Search through 100+ ingredients with smart suggestions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Support**: Easy on the eyes for late-night cooking inspiration
- **Daily Dishes**: New dish every day with shareable results
- **Statistics Tracking**: Track your culinary knowledge over time

## Technical Details

This project transforms the original Wordle concept into a culinary guessing game:

- **Variable Ingredient Counts**: Dishes can have 4-6 core ingredients
- **Ingredient Database**: Categorized ingredients with substitute relationships
- **Smart Validation**: Autocomplete prevents invalid ingredient guesses
- **Enhanced Sharing**: Emoji grids with dish-specific emojis

## Projects built using this repo

### Other languages

- [Arwordle](https://arwordle.netlify.app/): Arabic
- [Boludle](https://www.boludle.com/): Argentinian
- [Gerdle](https://gerdle.vext.co.uk/): Cornish (Kernowek)
- [Keclap](https://keclap.xyz/): Sundanese
- [Kelmaly](https://kelmaly.com/): Arabic
- [Latindictionary.io](https://wordle.latindictionary.io/): Latin
- [Lexoula](https://lexoula.com/): Ελληνικά (Greek)
- [Malay](https://malay-wordle.netlify.app/): Bahasa Malaysia
- [Mondle](https://mondle.vercel.app/): Mongolian
- [Parolette](https://parolette.netlify.app/): Italian
- [Parolle.it](https://parolle.it): Italian
- [Pashtoodle](https://pashtoodle.lingdocs.com): Pashto
- [Persian](https://www.persian-wordle.ir/): Persian (Farsi)
- [Pinyin](https://www.pinyindle.com/): Pinyin (romanization system for Mandarin Chinese)
- [Rudle](https://rudle.vercel.app): Russian
- [Sindhal](https://hellosindh.com/sindhal): Sindhi
- [Szózat](https://szozat.miklosdanka.com/): Hungarian
- [Tàu Tâi-gí (Taigi Wordle)](https://tau.taigi.info/): Taigi (Taiwanese)
- [Tlembung](https://tlembung.vercel.app/): Japanese
- [Tugma](https://tugma.vercel.app): Hiligaynon (spoken in the Philippines)
- [Ukrainian](https://goroh.pp.ua/games/wordle): Ukrainian
- [Urdle](https://urdle.chaoticity.com/): Urdu
- [Vārdulis](https://wordle.lielakeda.lv/): Latvian
- [Word-leh!](https://word-leh.com): Singlish
- [Wordlar](http://wordlar.uz/): Uzbek
- [Wordle (BOS)](https://elahmo.github.io/wordle/): Bosnian
- [Wordle (Spanish)](https://wordle-es.xavier.cc): Spanish/Espanol
- [Wordle-RO](https://wordle-ro.sirb.net/): Romanian
- [Wortel](https://wortel.wrintiewaar.co.za): Afrikaans
- [Wörtchen](https://woertchen.sofacoach.de): German
- [SGWordle](https://sgwordle.now.sh/): Swiss German
- [kelma.mt](https://kelma.mt): Maltese
- [Слівце](https://slivce.com/): Ukrainian
- [ਪੰਜਾਬੀ](https://punjabipuzzle.netlify.app/): Punjabi
- [சொல்லாடல் Soladle](https://omtamil.com/soladle): Tamil
- [字知之明](https://zedaizd.github.io/zh-char-puzzle/): Traditional Chinese
- [꼬들 - 한국어](https://belorin.github.io/): Korean
- [한글 풀어쓰기 5자](https://nakosung.github.io/wordle/): Korean
- [ไทย](https://buddhistuniversity.net/wordle-thai/): Thai

### Fun themes

- ['en si lì'ur](https://tirea.learnnavi.org/wordle): Na'vi, the constructed language from James Cameron's AVATAR (2009)
- [Airportle](https://airportle.scottscheapflights.com/): Airport Codes
- [Anidal](https://anidal-abrarhayat.web.app/): Animals
- [Birdle - Emojis](https://birdle.dev): Bird emojis
- [Birdle](https://www.creek-birdle.com/): Birds
- [Buildly](https://buildly.procurepro.co/): Construction themed
- [Crosswordle](https://crosswordle.mekoppe.com/): Crossword mashup
- [Dundle](https://dundle.dunmiffcord.com/): The Office
- [FFXIVrdle](https://ffxivrdle.com/): Final Fantasy XIV
- [Harry Potter](https://www.harrypotterwordle.com/): Harry Potter
- [JoJodle](https://jojo-news.com/fun/jojodle/): JoJo’s Bizarre Adventure
- [Mahjong Handle](https://mahjong-handle.update.sh/): Mahjong Hands
- [Filmle](https://filmle.now.sh/): Movie titles
- [Movie Wordle](https://movie-wordle.vercel.app): Bollywood
- [Murdle](https://murdle.vercel.app/): Spooky hangman mashup
- [Poker Handle](https://kikychow.github.io/poker-wordle/): Poker
- [Quettale](https://quettale.vercel.app/): Quenya, Elven language in LOTR
- [Radiole](https://radiole.vercel.app/): Radio-themed (for World Radio Day)
- [Squirdle](https://squirdle-inky.vercel.app/): Pokeman
- [Taylordle](https://www.taylordle.com/): Taylor Swift
- [Trekle](https://treklegame.com): Star Trek
- [Weedel](https://meetmeinouter.space/wordle/): Video game characters
- [Wordle.cl](https://www.wordle.cl): Chilean modisms, cities, places
- [Wrdl](https://wrdl-abae.vercel.app/): Words that are 5 letters long after getting rid of their vowels

### Math, Acronyms, Science, Tech, and more

- [AI-powered](https://github.com/asirota/wordle-ai): Includes an AI component
- [Colordle](https://github.com/necropolina/colordle): Guess the hexadecimal color code of the background
- [Genel](https://andrewholding.github.io/gene-wordle/): Gene symbols
- [Jazle](https://jazle.quest/): Javascript
- [Mathler](https://www.mathler.com/): Find the solution that equals X
- [Morsel](https://plingbang.github.io/morsel/): Morse
- [Numble](https://rbrignall.github.io/numble/): Maths
- [Opsle](https://opsle.vercel.app/): Ops
- [Passwordle](https://passwordle.sp8c3.com/): Passwords
- [Primel](https://converged.yt/primel/): Prime numbers
- [Qwordle](https://qwordle.bhat.ca/): Quantum version of Wordle (uses entangled word-pairs)
- [Quantle](https://deduckproject.github.io/quantle/): Another quantum variant where guesses are quantum equations
- [Rundle](https://furstenheim.github.io/react-wordle/): Like wordle, but only last three guesses are considered.
- [Stockle](https://stockle.win/): Guess the stock or ETF
- [Syscordle](https://nezza.github.io/syscordle/): SYSCALL
- [UNLOCOdle](https://unlocodle.collabital.com/): UNLOCODEs
- [Visionle](https://orisenbazuru.github.io/visionle/): Guess the label of randomly chosen image from ImageNet/ImageNet-Sketch dataset (Machine learning)

_Want to add one to the list? Just make a pull request or [let us know via a comment here](https://github.com/cwackerfuss/react-wordle/issues/120)_

## FAQ

### How can I change the length of a guess?

- Update the `MAX_WORD_LENGTH` variable in [src/constants/settings.ts](src/constants/settings.ts) to the desired length.
- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to only include words of the new length.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) arrays to only include words of the new length.

### How can I create a version in another language?

- In [.env](.env):
  - Update the title and the description
  - Set the `REACT_APP_LOCALE_STRING` to your locale
- In [public/index.html](public/index.html):
  - Update the "You need to enable JavaScript" message
  - Update the language attribute in the HTML tag
  - If the language is written right-to-left, add `dir="rtl"` to the HTML tag
- Update the name and short name in [public/manifest.json](public/manifest.json)
- Update the strings in [src/constants/strings.ts](src/constants/strings.ts)
- Add all of the five letter words in the language to [src/constants/validGuesses.ts](src/constants/validGuesses.ts), replacing the English words
- Add a list of goal words in the language to [src/constants/wordlist.ts](src/constants/wordlist.ts), replacing the English words
- Update the "Settings" modal in [src/components/modals/SettingsModal.tsx](src/components/modals/SettingsModal.tsx)
- Update the "Info" modal in [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx)
- If the language has letters that are not present in English update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in [src/lib/share.ts](src/lib/share.ts)

### How can I add usage tracking?

This repository includes support for Google Analytics or [Plausible Analytics](https://plausible.io), but, by default, this is disabled.

To enable Google Analytics:

- Create a Google Analytics 4 property and obtain the measurement ID (of the format `G-XXXXXXXXXX`)
- In [.env](.env), add `REACT_APP_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX`

Keep in mind that your region might have legislation about obtaining a user's consent before enabling trackers. This is up to downstream repos to implement.

To enable Plausible Analytics:

- Create a new website with Plausible Analytics with a given domain, e.g. `example.app`
- In [.env](.env), add `REACT_APP_PLAUSIBLE_DOMAIN=example.app`
