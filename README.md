# Axify

Axify is a personal music-listening web app built around your Spotify library. It brings listening, playback controls, queue management, and lyrics together in a calm, focused interface.

> [!WARNING]
> ## Axify is under active development and is not stable
>
> This project is a work in progress. Features may be incomplete, change without notice, or behave unexpectedly. You may encounter bugs, data or playback issues, and regressions. Do not rely on Axify for critical use, and use it at your own discretion.

## Features

- Connect a Spotify account and browse your music library.
- Control playback and manage the listening queue.
- View lyrics for the currently playing track when available.
- Create an account and sign in with Firebase.

Some features require Spotify and Firebase configuration. Availability may also depend on your Spotify account, region, and Spotify platform access.

## Getting started

### Requirements

- Node.js
- pnpm
- A Firebase project
- A Spotify developer app

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/spotify/callback
```

Add the redirect URI to your Spotify developer app's allowlist. Configure Firebase Authentication and Firestore for your Firebase project as well. Keep `.env.local` private and never commit credentials.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production app |
| `pnpm start` | Start the production server |

## Tech stack

- Next.js and React
- TypeScript
- Firebase Authentication and Firestore
- Spotify Web API and Web Playback SDK

## License

No license has been specified yet. All rights are reserved unless a license is added to this repository.
