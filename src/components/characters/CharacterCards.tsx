import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    CardTitle,
    CardContent
} from '@/components/ui/card';

// Character stats interface remains the same
interface CharacterStats {
    origin?: string;
    enemies?: string[];
    height?: string;
    weight?: string;
    density?: string;
    abilities?: string[];
    weaknesses?: string[];
}

// Add animationUrl to the Character interface
interface Character {
    name: string;
    type: string;
    description: string;
    imageUrl: string;
    animationUrl?: string; // URL to GIF or video for the back side
    isVideo?: boolean; // Flag to determine if animation is a video
    stats?: CharacterStats;
}

const FlipCard = ({ character }: { character: Character }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [animationLoaded, setAnimationLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Handle card flip and expansion
    const handleFlip = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            // Lock body scroll when card is expanded
            document.body.style.overflow = 'hidden';
        }
    };

    // Handle closing the expanded card
    const handleClose = () => {
        setIsFlipped(false);
        // Restore body scroll
        document.body.style.overflow = '';
    };

    // Handle click outside to close expanded card
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (isFlipped && event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isFlipped]);

    return (
        <>
            {/* Card Container*/}
            <div className="card-container" ref={cardRef}>
                {/* Front Side Only */}
                <Card
                    className="w-full h-full cursor-pointer flex flex-col dark:bg-gray-800 rounded-xl overflow-hidden"
                    onClick={handleFlip}
                >
                    <div className="relative flex-grow h-[400px]">
                        <img
                            src={character.imageUrl}
                            alt={`${character.name} - ${character.type}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <CardContent className="p-4 bg-white dark:bg-gray-800 mt-auto">
                        <CardTitle className="mb-2 text-gray-900 dark:text-white">{character.name}</CardTitle>
                        <p className="text-sm text-gray-400 dark:text-gray-300 mb-2">{character.type}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{character.description}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Full-screen Back Side (separate from card flip) */}
            {isFlipped && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative w-[90vw] h-[85vh] max-w-6xl rounded-xl overflow-hidden">
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <Card className="w-full h-full dark:bg-gray-800 overflow-hidden">
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Left side: Animation/GIF/Video */}
                                <div className="w-full md:w-1/2 h-64 md:h-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                    {character.animationUrl ? (
                                        character.isVideo ? (
                                            <video
                                                src={character.animationUrl}
                                                autoPlay
                                                muted
                                                className="w-full h-full object-cover"
                                                onLoadedData={() => setAnimationLoaded(true)}
                                            />
                                        ) : (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                {!animationLoaded && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                                    </div>
                                                )}
                                                <img
                                                    src={character.animationUrl}
                                                    alt={`${character.name} animation`}
                                                    className="w-full h-full object-cover"
                                                    onLoad={() => setAnimationLoaded(true)}
                                                    style={{ display: animationLoaded ? 'block' : 'none' }}
                                                />
                                            </div>
                                        )
                                    ) : (
                                        <img
                                            src={character.imageUrl}
                                            alt={`${character.name}`}
                                            className="w-full h-full object-contain opacity-70"
                                        />
                                    )}
                                </div>

                                {/* Right side: Character stats */}
                                <div className="w-full md:w-1/2 bg-indigo-100 dark:bg-gray-800 overflow-y-auto">
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                                            {character.name}
                                        </h3>

                                        {character.stats ? (
                                            <div className="space-y-4">
                                                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                                                    <div className="space-y-3">
                                                        {character.stats.origin && (
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">Origin</h4>
                                                                <p className="text-sm text-gray-700 dark:text-white">{character.stats.origin}</p>
                                                            </div>
                                                        )}

                                                        {(character.stats.height || character.stats.weight || character.stats.density) && (
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">Physical Stats</h4>
                                                                <div className="text-sm text-gray-700 dark:text-white">
                                                                    {character.stats.height && <p>Height: {character.stats.height}</p>}
                                                                    {character.stats.weight && <p>Weight: {character.stats.weight}</p>}
                                                                    {character.stats.density && <p>Density: {character.stats.density}</p>}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {character.stats.abilities && character.stats.abilities.length > 0 && (
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">Abilities</h4>
                                                                <ul className="text-sm text-gray-700 dark:text-white list-disc pl-4">
                                                                    {character.stats.abilities.map((ability, index) => (
                                                                        <li key={index}>{ability}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {character.stats.weaknesses && character.stats.weaknesses.length > 0 && (
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">Weaknesses</h4>
                                                                <ul className="text-sm text-gray-700 dark:text-white list-disc pl-4">
                                                                    {character.stats.weaknesses.map((weakness, index) => (
                                                                        <li key={index}>{weakness}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {character.stats.enemies && character.stats.enemies.length > 0 && (
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">Known Enemies</h4>
                                                                <ul className="text-sm text-gray-700 dark:text-white list-disc pl-4">
                                                                    {character.stats.enemies.map((enemy, index) => (
                                                                        <li key={index}>{enemy}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-600 dark:text-white">No additional information available</p>
                                        )}
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

// CharacterSection component
const CharacterSection = ({ title, characters }: { title: string, characters: Character[] }) => (
    <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map(character => (
                <FlipCard key={character.name} character={character} />
            ))}
        </div>
    </div>
);

const CharacterCards = () => {
    // Your existing character arrays (inhumanoids, earthCorps, mutores)
    // Update to include animationUrl and isVideo properties
    const inhumanoids: Character[] = [
        {
            name: 'D\'Compose',
            type: 'Evil Inhumanoid',
            description: 'Undead monster with corruption powers',
            imageUrl: '/images/characters/inhumanoids-dcompose-reaching.png',
            animationUrl: '/videos/dcompose.mp4', // D'Compose mp4
            isVideo: true, // Set to true if it's a video instead of a GIF
            stats: {
                origin: 'Skelweb - Earth\'s crust',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites'],
                height: '39 ft (11.9 m)',
                weight: '94,815 lbs (43,007 kg)',
                density: '112 lbs/ft cubed (1.8 gm/cc)',
                abilities: [
                    'Corruption touch',
                    'Undead transformation',
                    'Superhuman strength',
                    'Regeneration'
                ],
                weaknesses: [
                    'Sunlight',
                    'Certain chemical compounds',
                    'Extreme heat'
                ]
            }
        },
        // Add animationUrl and isVideo properties to other characters
        {
            name: 'Metlar',
            type: 'Evil Inhumanoid',
            description: 'Living magma creature, leader of Inhumanoid forces',
            imageUrl: '/images/characters/metlar_cartoon.jpg',
            animationUrl: '/videos/metlar(1).mp4', // Metlar mp4
            isVideo: true,
            stats: {
                // Stats remain the same
                origin: 'Infernac - Earth\'s core',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites', 'Sslither'],
                height: '40 ft (12 m)',
                weight: '286,528 lbs (129,997 kg)',
                density: '343.2 lbs/ft cubed (5.5 gm/cc)',
                abilities: [
                    'Lava vomit',
                    'Lava bombs',
                    'Superhuman strength',
                    'Unearthly durability',
                    'Commands a statue army'
                ],
                weaknesses: [
                    'Water',
                    'Powerful magnetic fields'
                ]
            }
        },
        {
            name: 'Tendril',
            type: 'Evil Inhumanoid',
            description: 'Enormous plant beast with regenerative powers',
            imageUrl: '/images/characters/tendril_cartoon.png',
            animationUrl: '/videos/tendril.mp4', // Tendril mp4
            isVideo: true,
            stats: {
                origin: 'Earth\'s mantle',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites'],
                height: 'Variable; Typically 38 ft (11.6 m) to 55 ft (16.8 m)',
                weight: '104,192 lbs (47,261 kg)',
                density: '124.8 lbs/ft cubed (2.0 gm/cc)',
                abilities: [
                    'Severed limbs can form entire Tendril clones',
                    'Superhuman strength',
                    'Incredible durability'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Extreme heat',
                    'Low intelligence'
                ]
            }
        },
        {
            name: 'Sslither',
            type: 'Evil Inhumanoid',
            description: 'Serpentine original leader of the Inhumanoids, overthrown by Metlar',
            imageUrl: '/images/characters/sslither_cartoon.png',
            animationUrl: '/videos/Inhumanoids_The_Masterson_Team_E12.gif', // Sslither gif
            isVideo: false,
            stats: {
                origin: 'Unknown; Most recent appearance: near Angkor Wat in Cambodia',
                enemies: ['Metlar', 'Earth Corps', 'The Redwoods', 'The Granites'],
                height: '45 ft (13.7 m)',
                weight: '112,500 lbs (51,029 kg)',
                density: '200 lbs/ft cubed (3.2 gm/cc)',
                abilities: [
                    'Electric blasts',
                    'Superhuman strength',
                    'Monstrous durability',
                    'Commands 2 large snake-like creatures and an army of beast-headed/winged monsters'
                ],
                weaknesses: [
                    'Was able to be imprisoned in hardened lava'
                ]
            }
        },
        {
            name: 'Gagoyle',
            type: 'Evil Inhumanoid',
            description: 'Mindless cyclopean creature with a transparent stomach and an insatiable appetite',
            imageUrl: '/images/characters/gagoyle_cartoon.jpg',
            animationUrl: '/videos/Inhumanoids_The_Evil_Eye_E10.gif', // Gagoyle gif
            isVideo: false,
            stats: {
                origin: 'Unnamed radioactive volcanic cave',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites', 'The Inhumanoids'],
                height: '30 ft (9.1 m)',
                weight: '115,468 lbs (52,375.4 kg)',
                density: '237 lbs/ft cubed (3.79 gm/cc)',
                abilities: [
                    'Can and will eat anything',
                    'Superhuman strength',
                    'Extreme durability'
                ],
                weaknesses: [
                    'Laziness',
                    'Slow',
                    'Extremely low intelligence'
                ]
            }
        },
        {
            name: 'Nightcrawler',
            type: 'Evil Ally',
            description: 'Originally called \'Toxoid\', Nightcrawler is the remains of Dr. Herman Manglar, augmented with cybernetic parts and reanimated by D\'Compose\'s corruptive touch',
            imageUrl: '/images/characters/inhumanoids_nightcrawler_cartoon.png',
            animationUrl: '/videos/Inhumanoids__Dr_Herman_Mangler_Scenes.gif', // Nightcrawler gif
            isVideo: false,
            stats: {
                origin: 'Unknown (presumed British), former prisoner at Glades Penitentiary (Florida?)',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites'],
                height: '8 ft (2.4 m)',
                weight: '437 lbs (198.2 kg)',
                density: '7.28 lbs/ft cubed (0.12 gm/cc)',
                abilities: [
                    'Brilliant scientific mind',
                    'Cybernetic enhancements',
                    'Superhuman strength',
                    'Steel-reinforced \'wormwhip\' arm'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Extreme heat',
                    'Warped mind',
                    'Strained alliances'
                ]
            }
        },
        {
            name: 'Blackthorne Shore',
            type: 'Evil Ally',
            description: 'AKA Brother Druid, Blackthorne Shore is a ruthless mining magnate, an initial funder turned enemy of Earth Corps, and brother to Sandra Shore',
            imageUrl: '/images/characters/blackthorne_shore_cartoon.jpg',
            animationUrl: '/videos/Inhumanoids_S01E10_The_Evil_Eye.gif', // Blackthorne Shore gif
            isVideo: false,
            stats: {
                origin: 'Phoenix, Arizona, United States',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites', 'The Inhumanoids'],
                height: '6 ft (1.8 m)',
                weight: '240 lbs (108.9 kg)',
                density: 'N/A',
                abilities: [
                    'Extreme wealth',
                    'Access to ancient texts',
                    'Political clout',
                    'Alliance with the Inhumanoids',
                    'Exploration suit -- features: Ht: 9 ft (2.7 m) Wt: 400 lbs (180 kg); provides enhanced strength and durability, environmental protection, and the ability to generate powerful magnetic fields'
                ],
                weaknesses: [
                    'Ambition without ethics',
                    'Susceptible to human laws'
                ]
            }
        },
        {

            name: 'The Sandra Creature',
            type: 'Evil Ally',
            description: 'After being touched by D\'Compose, Sandra was turned into a giant undead monster',
            imageUrl: '/images/characters/inhumanoids_sandra_monster_cartoon.png',
            animationUrl: '/videos/sandracreature.mp4', // Sandra Creature gif
            isVideo: true,
            stats: {
                origin: 'Skelweb - Earth\'s crust',
                enemies: ['Earth Corps', 'The Redwoods', 'The Granites'],
                height: '36 ft (11 m)',
                weight: '65,220 lbs (29,583.3 kg)',
                density: '15.1 lbs/ft cubed ( gm/cc)',
                abilities: [
                    'Superhuman strength',
                    'Generally terrifying'
                ],
                weaknesses: [
                    'Sunlight'
                ]
            }
        }
        // Add stats for other characters...
    ];
    const earthCorps: Character[] = [
        {
            name: 'Dr. Herman "Herc" Armstrong, Codename: Hooker',
            type: 'Heroic Human',
            description: 'Leader of Earth Corps, Exo-suit Specialty: Exploration',
            imageUrl: '/images/characters/inhumanoids-herc-cartoon.jpg',
            animationUrl: '/videos/INHUMANOIDS__S1_Ep1__The_Evil_That_Lies_Within_Part_1.gif', // Hooker gif
            isVideo: false,
            stats: {
                origin: 'Salina, Kansas, United States',
                enemies: ['The Inhumanoids', 'Blackthorne Shore', 'Nightcrawler'],
                height: '6 ft i in (1.83 m)',
                weight: '195 lbs (88.45 kg)',
                density: 'N/A',
                abilities: [
                    'Geologist',
                    'Leadership',
                    'Alliance with the Mutores',
                    'Exploration suit -- features: Ht: 9 ft (2.7 m) Wt: 475 lbs (215 kg); provides enhanced strength and durability, environmental protection, microwave imaging, lifts in the suit\'s feet extending the suit\'s height by up to 5 ft, and a titanium steel grappling hook with 1000 ft of cable'
                ]
            }
        },
        {
            name: 'Dr. Derek Ericson Bright, Codename: Digger',
            type: 'Heroic Human',
            description: 'Earth Corps\' tech expert and engineer, Exo-suit Specialty: Excavation',
            imageUrl: '/images/characters/inhumanoids_digger_cartoon.jpg',
            animationUrl: '/videos/INHUMANOIDS__S1_Ep1__The_Evil_That_Lies_Within_Part_1(1).gif', // Digger gif
            isVideo: false,
            stats: {
                origin: 'Lancaster, Pennsylvania, United States',
                enemies: ['The Inhumanoids', 'Blackthorne Shore', 'Nightcrawler'],
                height: '5 ft 6 in (1.68 m)',
                weight: '175 lbs (79.4 kg)',
                density: 'N/A',
                abilities: [
                    'Mining Engineer',
                    'Inventor - designed and built Earth Corps\' exploration suits',
                    'Political clout',
                    'Alliance with the Mutores',
                    'Exploration suit -- features: Ht: 9 ft (2.7 m) Wt: 500 lbs (228 kg); provides enhanced strength and durability, environmental protection, electrochemical analysis, chemical compound processing and synthesis, terrain scanning and mapping, and large digging claws with a 500 lb lift max'
                ]
            }
        },
        {
            name: 'Dr. Edward "The Fist" Agutter, Codename: Auger',
            type: 'Heroic Human',
            description: 'Archaeologist and mechanic, Exo-suit Specialty: Penetration',
            imageUrl: '/images/characters/inhumanoids_auger_cartoon.jpg',
            animationUrl: '/videos/Inhumanoids_Auger_for_President_E13(1).gif', // Auger gif
            isVideo: false,
            stats: {
                origin: 'Tulsa, Oklahoma, United States',
                enemies: ['The Inhumanoids', 'Blackthorne Shore', 'Nightcrawler'],
                height: '6 ft 2 in (1.9 m)',
                weight: '220 lbs (99.8 kg)',
                density: 'N/A',
                abilities: [
                    'Retired professional heavyweight boxer',
                    'Spelunker',
                    'Political clout',
                    'Alliance with the Mutores',
                    'Exploration suit -- features: Ht: 9 ft (2.7 m) Wt: 650 lbs (294.8 kg); provides enhanced strength and durability, environmental protection, various weapons, shock coils, grappling helmet, and a multi-functional drill unit'
                ]
            }
        },
        {
            name: 'Dr. Johnathon Martin Slattery, Codename: Liquidator',
            type: 'Heroic Human',
            description: 'Earth Corps\' master chemist, Exo-suit Specialty: Chemical Dispersion',
            imageUrl: '/images/characters/inhumanoids_liquidator_cartoon.jpg',
            animationUrl: '/videos/Inhumanoids_S01E03_The_Evil_That_Lies_Within_Part_3.gif', // Liquidator gif
            isVideo: false,
            stats: {
                origin: 'San Diego, California, United States',
                enemies: ['The Inhumanoids', 'Blackthorne Shore', 'Nightcrawler'],
                height: '6 ft (1.8 m)',
                weight: '200 lbs (90 kg)',
                density: 'N/A',
                abilities: [
                    'Demolitions expert (veteran)',
                    'Chemist',
                    'Semi-professional artist',
                    'Alliance with the Mutores',
                    'Exploration suit -- features: Ht: 9 ft (2.7 m), Wt: 400 lbs (181.4 kg); provides enhanced strength and durability, environmental protection, spectrophotometry unit, specimen breakdown apparatus, and the ability to discharge a stream of highly corrosive chemicals'
                ]
            }
        },
        {
            name: 'Sandra Shore',
            type: 'Heroic Human',
            description: "Staunch supporter, financial backer, and member of Earth Corps, Exo-suit Specialty: Navigation",
            imageUrl: '/images/characters/inhumanoids_sandra_cartoon.jpg',
            animationUrl: '/videos/Inhumanoids_1986__Episode_5__The_Evil_That_Lies_Within_Par.gif', // Sandra Shore gif
            isVideo: false,
            stats: {
                origin: 'Phoenix, Arizona, United States',
                enemies: ['The Inhumanoids', 'Blackthorne Shore', 'Nightcrawler'],
                height: '5 ft 6 in (1.7 m)',
                weight: '135 lbs (61.2 kg)',
                density: 'N/A',
                abilities: [
                    'Extreme wealth',
                    'Exploration suit -- features: Ht: 8 ft (2.4 m) Wt: 345 lbs (156.5 kg); provides enhanced strength and durability, environmental protection, and advanced navigational systems'
                ]
            }
        }
    ];
    const mutores: Character[] = [
        {
            name: 'The Redwoods',
            type: 'Heroic Mutores',
            description: "Ancient sentient tree beings and enemies of the Inhumanoids",
            imageUrl: '/images/characters/mutore_redwoods.jpg',
            animationUrl: '/videos/_INHUMANOIDS_THE_MOVIE_.gif', // Redwoods gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s crust',
                enemies: ['The Inhumanoids (specifically Metlar)', 'Blackthorne Shore', 'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '2,816 lbs (1,267 kg)',
                density: '149.8 lbs/ft cubed (2.4 gm/cc)',
                abilities: [
                    'Size transformation',
                    'Camouflage',
                    'Superhuman strength',
                    'Regeneration'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Fire'
                ]
            }
        },
        {
            name: 'Redsun',
            type: 'Heroic Redwood',
            description: "Redwood scout",
            imageUrl: '/images/characters/inhumanoids_redsun_cartoon.png',
            animationUrl: '/videos/_INHUMANOIDS_THE_MOVIE_(3).gif', // Redsun gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s crust',
                enemies: ['The Inhumanoids (specifically Metlar)', 'Blackthorne Shore', 'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '2,816 lbs (1,267 kg)',
                density: '149.8 lbs/ft cubed (2.4 gm/cc)',
                abilities: [
                    'Size transformation',
                    'Camouflage',
                    'Superhuman strength',
                    'Regeneration'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Fire'
                ]
            }
        },
        {
            name: 'Redlen',
            type: 'Heroic Redwood',
            description: "Leader of the Redwoods",
            imageUrl: '/images/characters/inhumanoids_redlen_cartoon.png',
            animationUrl: '/videos/_INHUMANOIDS_THE_MOVIE_(1).gif', // Redlen gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s crust',
                enemies: ['The Inhumanoids (specifically Metlar)', 'Blackthorne Shore', 'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '2,816 lbs (1,267 kg)',
                density: '149.8 lbs/ft cubed (2.4 gm/cc)',
                abilities: [
                    'Size transformation',
                    'Camouflage',
                    'Superhuman strength',
                    'Regeneration'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Fire'
                ]
            }
        },
        {
            name: 'The Granites',
            type: 'Heroic Mutores',
            description: "Elder race of living rock",
            imageUrl: '/images/characters/inhumanoids_granites_cartoon.png',
            animationUrl: '/videos/_INHUMANOIDS_THE_MOVIE_(2).gif', // Granites gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s mantle',
                enemies: ['The Inhumanoids (specifically Tendril)', 'Blackthorne Shore', 'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '3,520 lbs (1,584 kg)',
                density: '187.2 lbs/ft cubed (3.0 gm/cc)',
                abilities: [
                    'Camouflage',
                    'Extreme durability',
                    'Superhuman strength',
                    'Masters of art and science'
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Extreme concussive force'
                ]
            }
        },
        {
            name: 'Granok',
            type: 'Heroic Granite',
            description: "Leader of the Granites",
            imageUrl: '/images/characters/inhumanoids_granok_cartoon.jpg',
            animationUrl: '/videos/_INHUMANOIDS_THE_MOVIE_(4).gif', // Granok gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s mantle',
                enemies: ['The Inhumanoids (specifically Tendril)\', \'Blackthorne Shore\', \'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '3,520 lbs (1,584 kg)',
                density: '187.2 lbs/ft cubed (3.0 gm/cc)',
                abilities: [
                    'Fearless fighter',
                    'Acute hearing',
                    'Camouflage',
                    'Extreme durability',
                    'Superhuman strength',
                ],
                weaknesses: [
                    'Certain chemical compounds',
                    'Extreme concussive force'
                ]
            }
        },
        {
            name: 'Magnakor',
            type: 'Heroic Mutore(s)',
            description: "Bipolar composite entity tasked with keeping Metlar trapped in a magnetic field; Magnakor splits into two separate beings: Pyre and Crygen",
            imageUrl: "/images/characters/inhumanoids_magnakor_separated_cartoon.jpg",
            animationUrl: '/videos/Inhumanoids_Auger_for_President_E13.gif', // Magnakor gif
            isVideo: false,
            stats: {
                origin: 'The Earth\'s core',
                enemies: ['The Inhumanoids (specifically Tendril)\', \'Blackthorne Shore\', \'Nightcrawler'],
                height: '12 ft (3.6 m)',
                weight: '11,230 lbs (5,076 kg)',
                density: '499.2 lbs/ft cubed (8.0 gm/cc)',
                abilities: [
                    'Powerful magnetic field generation',
                    'Superhuman strength',
                    'Extreme durability'
                ],
                weaknesses: [
                    'Crygen\'s and Pyre\'s own opposing personalities paired with their opposing magnetic fields'
                ]
            }
        }

    ];
    // Other character arrays remain the same but should be updated with animation URLs

    return (
        <div id="characters" className="max-w-7xl mx-auto px-4 py-12 mt-24 bg-transparent dark:bg-transparent">
            <CharacterSection title="The Inhumanoids" characters={inhumanoids} />
            <CharacterSection title="Earth Corps" characters={earthCorps} />
            <CharacterSection title="The Mutores" characters={mutores} />
        </div>
    );
};

export default CharacterCards;