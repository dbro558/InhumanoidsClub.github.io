import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';

const ComicPreview = () => {
    const comics = [
        {
            title: 'The Coming of the Inhumanoids: Part 1 of 4',
            image: '/images/comics/inhumanoids_comic_issue_1.jpg',
            description: 'Based on the screenplay by Flint Dille. Adapted by Jim Salicrup. Art and cover by James W. Fry and Joe Del Beato. Inhumanoids is 1-part 1950s monster movie, 1-part sci-fi adventure, and 1-part ecological warning. A group of scientists, strapped inside high tech suits of armor, explore the catacombs of the earth and discover that ancient evil creatures called the Inhumanoids lay in wait to rise up and conqueror mankind. 32 pages Cover price $0.75.'
        },
        {
            title: 'The Coming of the Inhumanoids: Part 2 of 4',
            image: '/images/comics/inhumanoids_comic_issue_2.jpg',
            description: '"I Left My Monsters in San Francisco!" Based on the screenplay by Flint Dille. Adapted by Jim Salicrup. Art and cover by James W. Fry and Joe Del Beato. The Inhumanoids, monstrous behemoths of immense power, live again! What can the monsters, Tendril and D\'Compose possibly want? The scientists of Earth Corps soon found themselves caught in the middle of a centuries-old war between these Inhumanoids and the Mutores, benevolent elemental creatures of rock, wood, fire, and ice. 32 pages Cover price $0.75.'
        },
        {
            title: 'The Coming of the Inhumanoids: Part 3 of 4',
            image: '/images/comics/inhumanoids_comic_issue_3.jpg',
            description: '"The Battle Down Below!" Based on the screenplay by Flint Dille. Adapted by Jim Salicrup. Art by Jose Delbo and Art Thibert. Armed with new weapons and a plan, the Earth Corps venture down into the bowels of the earth to confront the dangerous Inhumanoids. But are they ready for what they find when they enter the domain of D\'Compose? 32 pages Cover price $0.75. '
        },
        {
            title: 'The Coming of the Inhumanoids: Part 4 of 4',
            image: '/images/comics/inhumanoids_comic_issue_4.jpg',
            description: '"Metlar Unleashed!" Based on the screenplay by Flint Dille. Adapted by Jim Salicrup. Art by Carmine Infantino and Danny Bulanadi. How can the brave members of Earth Corps and the Mutores hope to triumph over the evil Inhumanoids after the unstoppable Metlar is unleashed?! FC, 32 pages NOTE: Unfortunately this series ends on a cliffhanger and the resolution to this story has never seen print. Cover price $1.00. '
        }
        // Add more comics
    ];

    return (
        <div id="comics" className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Comics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {comics.map(comic => (
                    <Card
                        key={comic.title}
                        className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden bg-white dark:bg-gray-800"
                    >
                        <div className="relative h-[500px]">
                            <img
                                src={comic.image}
                                alt={comic.title}
                                className="object-contain w-full h-full rounded-t-lg bg-gray-100 dark:bg-gray-700 p-2"
                            />
                        </div>
                        <CardContent className="p-6">
                            <CardTitle className="text-xl text-gray-900 dark:text-white mb-4">
                                {comic.title}
                            </CardTitle>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {comic.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ComicPreview;
