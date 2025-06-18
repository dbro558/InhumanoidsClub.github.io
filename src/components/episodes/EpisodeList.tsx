import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';

// Define the interface for episode data
interface Episode {
    title: string;
    airDate: string;
    writer: string;
    episodeNumber: number;
    imageUrl: string;
    youtubeUrl: string;
    summary?: string; // Optional property
}

const EpisodeList = () => {
    const episodes: Episode[] = [
        {
            title: 'The Evil That Lies Within, Part 1',
            airDate: 'September 21, 1986',
            writer: 'Flint Dille',
            episodeNumber: 1,
            summary: '"The Evil That Lies Within, Part 1"\n' +
                'Earth Corps discovers an amber monolith while investigating strange occurrences, leading to Blackthorne Shore\'s release of Tendril and D\'Compose. The ancient Mutores awaken to aid Earth Corps against these threats.',
            imageUrl: '/images/episodes/inhumanoids_episode_1_thumb.jpg',
            youtubeUrl: 'https://youtu.be/A7XJ7lXDZVQ?si=c8aPwf1fU9H-WM1Z'
        },
        {
            title: 'The Evil That Lies Within, Part 2',
            airDate: 'September 28, 1986',
            writer: 'Flint Dille',
            episodeNumber: 2,
            summary: '"The Evil That Lies Within, Part 2"\n' +
                'After Tendril destroys their base, Earth Corps gains funding from Sandra Shore to build new vehicles and pursue the creatures underground, but Metlar breaks free during the confrontation.',
            imageUrl: '/images/episodes/inhumanoids_episode_2_thumb.jpg',
            youtubeUrl: 'https://youtu.be/_bjTYGMj8b4?si=7IiWde65_v53St6w'
        },
        {
            title: 'The Evil That Lies Within, Part 3',
            airDate: 'October 5, 1986',
            writer: 'Flint Dille',
            episodeNumber: 3,
            summary: '"The Evil That Lies Within, Part 3"\n' +
                'Earth Corps splits up to tackle multiple threats - some heading to Skellweb to save Sandra from D\'Compose\'s touch, while others venture into Infernac where Blackthorne faces off against Metlar.',
            imageUrl: '/images/episodes/inhumanoids_episode_3_thumb.jpg',
            youtubeUrl: 'https://youtu.be/EPPYn4aS_U4?si=0O3LHSMsH_yAN1xs'
        },
        {
            title: 'The Evil That Lies Within, Part 4',
            airDate: 'October 12, 1986',
            writer: 'Flint Dille',
            episodeNumber: 4,
            summary: '"The Evil That Lies Within, Part 4"\n' +
                'The Inhumanoids steal nuclear weapons from a Soviet base, while Blackthorne\'s apparent warning to Earth Corps turns out to be a deceptive trap.',
            imageUrl: '/images/episodes/inhumanoids_episode_4_thumb.jpg',
            youtubeUrl: 'https://youtu.be/kvLq0u2hNRE?si=hMhjXGb9Jr0BLiKG'
        },
        {
            title: 'The Evil That Lies Within, Part 5',
            airDate: 'October 19, 1986',
            writer: 'Flint Dille',
            episodeNumber: 5,
            summary: '"The Evil That Lies Within, Part 5"\n' +
                'Earth Corps races to prevent a catastrophic plan involving the planet\'s core, ultimately succeeding in containing the Inhumanoid threats and capturing Blackthorne, though a sample of Tendril mysteriously disappears.',
            imageUrl: '/images/episodes/inhumanoids_episode_5_thumb.jpg',
            youtubeUrl: 'https://youtu.be/m6IOxBVlEx8?si=5xnTXN5_txdFXDw3'
        },
        {
            title: 'Cypheroid',
            airDate: 'October 26, 1986',
            writer: 'Flint Dille',
            episodeNumber: 6,
            summary: 'A tissue sample from Tendril creates a second monster, leading to a dangerous alliance between a sentient supercomputer and the Inhumanoids.',
            imageUrl: '/images/episodes/inhumanoids_episode_6_thumb.jpg',
            youtubeUrl: 'https://youtu.be/_M30BHCqtbY?si=-Y6N12kEPxBI3quZ'
        },
        {
            title: 'The Surma Plan',
            airDate: 'November 2, 1986',
            writer: 'Flint Dille',
            episodeNumber: 7,
            summary: 'Soviet forces attempt to flood Infernac, forcing Earth Corps to temporarily ally with Metlar to prevent global destruction.',
            imageUrl: '/images/episodes/inhumanoids_episode_7_thumb.jpg',
            youtubeUrl: 'https://youtu.be/FuWPPu6LhL4?si=KhzJZomhkpbtr2mE'
        },
        {
            title: 'Cult of Darkness',
            airDate: 'November 9, 1986',
            writer: 'Flint Dille and Larry Parr (story), Buzz Dixon (teleplay)',
            episodeNumber: 8,
            summary: 'D\'Compose turns San Francisco teenagers into zombies as part of Blackthorne Shore\'s sinister recruitment scheme.',
            imageUrl: '/images/episodes/inhumanoids_episode_8_thumb.jpg',
            youtubeUrl: 'https://youtu.be/ZG6RCB8SqqE?si=t0pJslJBSzYBQx-5'
        },
        {
            title: 'Negative Polarity',
            airDate: 'November 16, 1986',
            writer: 'Flint Dille, Richard Merwin',
            episodeNumber: 9,
            summary: 'A magnetic disruption causes personality reversals among the Mutores and Metlar, threatening to bring Earth\'s Van Allen belt to the surface.',
            imageUrl: '/images/episodes/inhumanoids_episode_9_thumb.jpg',
            youtubeUrl: 'https://youtu.be/RC6dSZhC-kA?si=QOJnMPPru8arKBbP'
        },
        {
            title: 'The Evil Eye',
            airDate: 'November 23, 1986',
            writer: 'Flint Dille',
            episodeNumber: 10,
            summary: 'Blackthorne and Nightcrawler unleash Gagoyle, while Shore pursues an ancient evil hidden in Borneo.',
            imageUrl: '/images/episodes/inhumanoids_episode_10_thumb.jpg',
            youtubeUrl: 'https://youtu.be/jrdoxvrqeDc?si=0_qft9hBoJnnd9iA'
        },
        {
            title: 'Primal Passions',
            airDate: 'November 30, 1986',
            writer: 'Flint Dille',
            episodeNumber: 11,
            summary: 'Blackthorne frees Sslither from an ancient prison, while a chemical mishap causes the Inhumanoids to fall in love with unusual objects.',
            imageUrl: '/images/episodes/inhumanoids_episode_11_thumb.jpg',
            youtubeUrl: 'https://youtu.be/y2ODZwYw1Fk?si=A7g6rPytUU0g11XZ'
        },
        {
            title: 'The Masterson Team',
            airDate: 'December 7, 1986',
            writer: 'Flint Dille, Richard Merwin',
            episodeNumber: 12,
            summary: 'Senator Masterson leads a televised mission to recover the Statue of Liberty from Metlar, while Earth Corps deals with Sslither\'s return.',
            imageUrl: '/images/episodes/inhumanoids_episode_12_thumb.jpg',
            youtubeUrl: 'https://youtu.be/4LqSEO947pk?si=oM-0Mnkuo5KOtMSz'
        },
        {
            title: 'Auger... for President?',
            airDate: 'December 14, 1986',
            writer: 'Flint Dille',
            episodeNumber: 13,
            summary: 'Auger runs for president against Senator Masterson, leading to a final confrontation with the Inhumanoids.',
            imageUrl: '/images/episodes/inhumanoids_episode_13_thumb.jpg',
            youtubeUrl: 'https://youtu.be/5n6d8snL8RY?si=BvOfwEQKaKYtWYfd'
        },
        {
            title: 'Inhumanoids Toy Commercial Compilation',
            airDate: '1986',
            writer: 'TBD',
            episodeNumber: 0,
            summary: "Inhumanoids toy commercials for Metlar, D'Compose, Tendril, Redlen, Magnakor, and the Granites. Guest starring Earth Corps.",
            imageUrl: '/images/episodes/inhumanoids_toy_commercials.jpg',
            youtubeUrl: 'https://youtu.be/a5arEkEFJ2k?si=ladZTRTU2q25dV5M'
        }
    ];

    const handleEpisodeClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div id="episodes" className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Episodes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.map((episode: Episode) => (
                    <Card
                        key={episode.title}
                        className="hover:shadow-lg transition-shadow cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800" // Added bg colors here
                        onClick={() => handleEpisodeClick(episode.youtubeUrl)}
                    >
                        <div className="relative h-48">
                            <img
                                src={episode.imageUrl}
                                alt={`${episode.title} thumbnail`}
                                className="object-cover w-full h-full rounded-t-lg"
                            />
                        </div>
                        <CardHeader className="p-4"> {/* Removed bg colors from here */}
                            <CardTitle className="text-gray-900 dark:text-white">
                                Episode {episode.episodeNumber}: {episode.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4"> {/* Removed bg colors from here */}
                            {episode.summary && (
                                <p className="text-sm text-gray-700 dark:text-white mb-2">{episode.summary}</p>
                            )}
                            <p className="text-sm text-gray-400 dark:text-white">Aired: {episode.airDate}</p>
                            <p className="text-sm text-gray-400 dark:text-white">Writer: {episode.writer}</p>
                            <p className="mt-2 text-sm text-amber-600 hover:text-cyan-800">
                                Click to watch episode →
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;
