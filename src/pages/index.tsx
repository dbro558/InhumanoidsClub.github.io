import Head from 'next/head';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import HeroSection from '@/components/layout/HeroSection';
import CharacterCards from '@/components/characters/CharacterCards';
import EpisodeList from '@/components/episodes/EpisodeList';
import ToyShowcase from '@/components/toys/ToyShowcase';
import ComicPreview from '@/components/comics/ComicPreview';
import FanArtGallery from '@/components/fanart/FanArtGallery';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Inhumanoids Fan Site</title>
                <meta name="description" content="Ultimate fan site for Inhumanoids" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div
                className="min-h-screen relative"
                style={{
                    backgroundImage: 'url("/images/inhumanoids_generic_toy_pkg_art.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}
            >
                <Navbar />
                <HeroSection />
                {/* Content container with semi-transparent background */}
                <div className="relative bg-white/20 dark:bg-black/20 min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <CharacterCards />
                        <EpisodeList />
                        <ToyShowcase />
                        <ComicPreview />
                        <FanArtGallery />
                        <ScrollToTop />
                        <main className="px-4 py-8">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Site created and maintained by inhumanoidsclub
                            </h1>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}