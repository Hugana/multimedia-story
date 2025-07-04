import Head from 'next/head';
import StoryEngine from '../components/StoryEngine';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>VisioPath</title>
        <meta name="description" content="Your story, your choices, your world—on the web." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{
      }}>
          <StoryEngine />

      </main>
    </>
  );
}
