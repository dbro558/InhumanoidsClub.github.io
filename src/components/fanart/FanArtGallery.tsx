import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent
} from '@/components/ui/card';
import { X } from 'lucide-react';

interface FanArt {
    title: string;
    image: string;
    artistName: string;
    artistSocial: string;
    website?: string;
}

const FlipCard = ({ art }: { art: FanArt }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullScreen) {
                setIsFullScreen(false);
                setIsFlipped(false);
            }
        };

        if (isFullScreen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isFullScreen]);

    const handleCardClick = () => {
        setIsFlipped(true);
        // Small delay to allow flip animation to start
        setTimeout(() => {
            setIsFullScreen(true);
        }, 100);
    };

    const handleClose = () => {
        setIsFullScreen(false);
        setTimeout(() => {
            setIsFlipped(false);
        }, 300);
    };

    const flipCardStyles = {
        container: {
            perspective: '1000px',
            width: '100%',
            height: '500px',
        },
        inner: {
            position: 'relative' as const,
            width: '100%',
            height: '100%',
            textAlign: 'center' as const,
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d' as const,
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        },
        front: {
            position: 'absolute' as const,
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden' as const,
            backfaceVisibility: 'hidden' as const,
        },
        back: {
            position: 'absolute' as const,
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden' as const,
            backfaceVisibility: 'hidden' as const,
            transform: 'rotateY(180deg)',
        },
    };

    return (
        <>
            <div style={flipCardStyles.container}>
                <div style={flipCardStyles.inner}>
                    {/* Front side */}
                    <div style={flipCardStyles.front}>
                        <Card
                            className="w-full h-full cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            onClick={handleCardClick}
                        >
                            <div className="h-80 overflow-hidden">
                                <img
                                    src={art.image}
                                    alt={art.title}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                                    {art.title}
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                                    by {art.artistName}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Back side - hidden when fullscreen */}
                    <div style={flipCardStyles.back} className={isFullScreen ? 'opacity-0' : 'opacity-100'}>
                        <Card className="w-full h-full cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-auto shadow-lg">
                            <div className="h-full flex flex-col">
                                <div className="flex-1 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="bg-gray-900 text-white p-4">
                                    <h3 className="font-bold text-lg mb-1">{art.title}</h3>
                                    <p className="text-sm mb-1">by <span className="italic">{art.artistName}</span></p>
                                    <p className="text-xs text-gray-300">
                                        {art.artistSocial}
                                        {art.website && (
                                            <>
                                                {' | website: '}
                                                <a
                                                    href={art.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {art.website}
                                                </a>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Full Screen Modal */}
            {isFullScreen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
                    <div className="relative w-full h-full max-w-6xl max-h-screen p-4 flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all duration-200"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal content */}
                        <Card className="w-full h-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl overflow-auto shadow-2xl flex flex-col">
                            <div className="flex-1 p-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                <img
                                    src={art.image}
                                    alt={art.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div className="bg-gray-900 text-white p-6">
                                <h3 className="font-bold text-2xl mb-2">{art.title}</h3>
                                <p className="text-lg mb-2">by <span className="italic">{art.artistName}</span></p>
                                <p className="text-sm text-gray-300">
                                    {art.artistSocial}
                                    {art.website && (
                                        <>
                                            {' | website: '}
                                            <a
                                                href={art.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 underline"
                                            >
                                                {art.website}
                                            </a>
                                        </>
                                    )}
                                </p>
                                <p className="text-sm text-gray-400 mt-4">Press ESC or click the X to close</p>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

const FanArtGallery = () => {
    const fanArt = [
        {
            title: 'Metlar',
            image: '/images/fanart/inhumanoids_metlar_dominicblack_fanart1.png', /*Each image = 640 x 640 px*/
            artistName: 'Dominic Black',
            artistSocial: 'socials: @dominicblackarts',
            website: 'https://dominicblackarts.club/home'
        },
        {
            title: 'Tendril',
            image: '/images/fanart/inhumanoids_fanart_tendril_dominicblack.JPG',
            artistName: 'Dominic Black',
            artistSocial: 'socials: @dominicblackarts',
            website: 'https://dominicblackarts.club/home'
        },
        {
            title: 'D\'Compose',
            image: '/images/fanart/inhumanoids_fanart_dcompose_dominicblackarts.JPG',
            artistName: 'Dominic Black',
            artistSocial: 'socials: @dominicblackarts',
            website: 'https://dominicblackarts.club/home'
        },
        {
            title: 'Nightcrawler',
            image: '/images/fanart/inhumanoids_fanart_nightcrawler1_dominicblack.png',
            artistName: 'Dominic Black',
            artistSocial: 'Socials: @dominicblackarts',
            website: 'https://dominicblackarts.club/home'
        },
        {
            title: "Tendril",
            image: '/images/fanart/inhumanoids_tendril_beastwreck_fanart.png',
            artistName: 'Beast Wreck',
            artistSocial: 'socials: @beastwreck'
        },
        {
            title: "D'Compose Updated Box Art",
            image: '/images/fanart/inhumanoids_dcompose_FNHot_fanart.jpg',
            artistName: 'FNHot on deviantart.com',
            artistSocial: 'socials: ?'
        },
        {
            title: "Liquidator vs. Tendril",
            image: '/images/fanart/inhumanoids_jimjiminez_liquidatorvstendril_fanart1.png',
            artistName: 'Jim Jimenez',
            artistSocial: 'socials: @jimnjimenezart'
        },
        {
            title: "Inhumanoids",
            image: '/images/fanart/inhumanoids_nathanrosario_fanart1.png',
            artistName: 'Nathan Rosario',
            artistSocial: 'socials: @nathan_rosario_art on instagram'
        },
        {
            title: "Inhumanoids Revisited",
            image: '/images/fanart/inhumanoids_dougwilliams_inhumanoidsrevisited_fanart1.png',
            artistName: 'Doug Williams',
            artistSocial: 'socials: doug williams at conceptartworld.com and artstation.com'
        }
    ];

    return (
        <div className="w-full">
            <div id="fanart" className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                    Fan Art
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fanArt.map((art, index) => (
                        <FlipCard key={`fanart-${index}-${art.artistName.replace(/\s+/g, '')}`} art={art} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FanArtGallery;