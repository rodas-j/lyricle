# Lyricle

This is a pre-release version of [Lyricle](https://www.lyricle.app/), a project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Official Site: [Lyricle](https://www.lyricle.app/)

## Features

The app has full edge function capabilities and is ready to be deployed on vercel. It includes code for tracking analytics manually, cookies banner, API Routes and testing for constants.

### CSS

This app makes use of both TailwindCSS and NextJS CSS Modules to create a better user experience.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Details

### Song Data

The data for the song lyrics can be found in `/json/*`. Files in this directory are not shipped to the user and will only be fetched when needed. This decreases the bundle that's shipped which removes the burden on your bandwidth while creating a better experience for the user.

### GA Analytics

The code for creating Google Analytics context value can be found in `src/components/layouts/layout.tsx`. In this code you can add your own [GA Measurement ID](https://support.google.com/analytics/answer/12270356?hl=en#:~:text=A%20Measurement%20ID%20is%20an,same%20as%20your%20destination%20ID)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## References

This project was heavily inspired and takes some of the resources from [react-wordle](https://github.com/cwackerfuss/react-wordle). We have learned a lot about React and Frontend Development and we owe it to the team behind this open-source project.
