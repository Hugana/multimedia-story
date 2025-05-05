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
        minHeight: '100vh',
        backgroundColor: '#111',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ maxWidth: 700, width: '100%' }}>
          <StoryEngine />
        </div>
      </main>
    </>
  );
}
