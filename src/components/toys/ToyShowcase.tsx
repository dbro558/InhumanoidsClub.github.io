import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
    Card,
    CardContent,
    CardTitle,
} from '@/components/ui/card';

interface ToyImages {
    mainImage: string;
    additionalImages: string[];
}

interface Toy {
    name: string;
    description: string;
    images: ToyImages;
}

const ImageCarousel = ({ images, onClose }: { images: ToyImages; onClose: () => void }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const allImages = [images.mainImage, ...images.additionalImages];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div className="relative w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <img
                    src={allImages[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="object-contain w-full h-full"
                />

                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                previousImage();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70"
                        >
                            <ChevronRight size={32} />
                        </button>
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                            {allImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

const ToyCard = ({ toy }: { toy: Toy }) => {
    const [showCarousel, setShowCarousel] = useState(false);

    return (
        <div className="relative">
            <Card
                className="w-full h-[550px] cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                onClick={() => setShowCarousel(true)}
            >
                <div className="relative h-[400px]">
                    <img
                        src={toy.images.mainImage}
                        alt={toy.name}
                        className="object-contain w-full h-full rounded-t-lg"
                    />
                </div>
                <CardContent className="p-4">
                    <CardTitle className="text-gray-900 dark:text-white">
                        {toy.name}
                    </CardTitle>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {toy.description}
                    </p>
                </CardContent>
            </Card>

            {showCarousel && (
                <ImageCarousel
                    images={toy.images}
                    onClose={() => setShowCarousel(false)}
                />
            )}
        </div>
    );
};

const ToyShowcase = () => {
    const toys = [
        {
            name: "Metlar",
            description: "Leader of The Inhumanoids",
            image: "/images/toys/Metlar/inhumanoids_metlar_toy_front.jpg",
            additionalImages: [
                "/images/toys/Metlar/inhumanoids_metlar_toy_pkg_frontnside.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_pkg_side.JPG",
                "/images/toys/Metlar/inhumanoids_metlar_toy_pkg_back.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed2.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed3.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed4.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed5.jpg",
                "/images/toys/Metlar/inhumanoids_metlar_toy_unboxed6.jpg"
            ]
        },
        {
            name: "D'Compose",
            description: "Undead Inhumanoid Horror",
            image: "/images/toys/D_Compose/DComposeToy.jpg",
            additionalImages: [
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_back.jpg",
                "/images/toys/D_Compose/dcompose_card_stats.png",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed2.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed3.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed4.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed5.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed6.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed7.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed8.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed9.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed10.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed11.jpg",
                "/images/toys/D_Compose/inhumanoids_dcompose_toy_unboxed12.jpg"
            ]
        },
        {
            name: "Tendril",
            description: "'Cruelest' of The Inhumanoids",
            image: "/images/toys/Tendril/inhumanoids_tendril_toy_pkg_front.JPG",
            additionalImages: [
                "/images/toys/Tendril/inhumanoids_tendril_toy_pkg_frontnside.JPG",
                "/images/toys/Tendril/inhumanoids_tendril_toy_pkg_back.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_toy_pkg_back_2.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_stats_card.JPG",
                "/images/toys/Tendril/inhumanoids_tendril_toy_unboxed.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_toy_unboxed2.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_toy_unboxed3.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_toy_unboxed4.jpg",
                "/images/toys/Tendril/inhumanoids_tendril_toy_unboxed5.jpg"
            ]
        },
        {
            name: "Herc Armstrong",
            description: "Leader of Earth Corps and spelunking adventurer",
            image: "/images/toys/Hooker/inhumanoids_herc_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Hooker/inhumanoids_herc_toy_pkg_back.jpg",
                "/images/toys/Hooker/inhumanoids_herc_toy_unboxed1.png",
                "/images/toys/Hooker/inhumanoids_herc_toy_unboxed2.png",
                "/images/toys/Hooker/inhumanoids_herc_toy_unboxed3.jpg"
            ]
        },
        {
            name: "Liquidator",
            description: "Earth Corps' master chemist",
            image: "/images/toys/Liquidator/inhumanoids_liquidator_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Liquidator/inhumanoids_liquidator_toy_pkg_back.jpg",
                "/images/toys/Liquidator/inhumanoids_liquidator_toy_unboxed.jpg",
                "/images/toys/Liquidator/inhumanoids_liquidator_toy_unboxed2.jpg",
                "/images/toys/Liquidator/inhumanoids_liquidator_toy_unboxed3.jpg"
            ]
        },
        {
            name: "Auger",
            description: "Earth Corps' archaeologist and exosuit and vehicle fabricator",
            image: "/images/toys/Auger/inhumanoids_auger_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Auger/inhumanoids_auuger_toy_pkg_back.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_pkg_back2.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_unboxed.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_unboxed2.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_unboxed3.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_unboxed4.jpg",
                "/images/toys/Auger/inhumanoids_auger_toy_unboxed5.jpg"
            ]
        },
        {
            name: "Dr. Derek Bright",
            description: "Excavation specialist and designer of Earth Corps' tech",
            image: "/images/toys/Digger/inhumanoids_digger_toy_pkg.JPG",
            additionalImages: [
                "/images/toys/Digger/inhumanoids_digger_toy_pkg_back.jpg",
                "/images/toys/Digger/inhumanoids_digger_toy_unboxed.jpg",
                "/images/toys/Digger/inhumanoids_digger_toy_unboxed2.jpg",
                "/images/toys/Digger/inhumanoids_digger_toy_unboxed3.jpg",
                "/images/toys/Digger/inhumanoids_digger_toy_unboxed4.jpg"
            ]
        },
        {
            name: "Redwood (Race)",
            description: "Race of tree-like Mutores",
            image: "/images/toys/Redwoods/inhumanoids_redwoods_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_pkg2.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_pkg_back.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_unboxed.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_unboxed2.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_unboxed3.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_toy_stats_card.jpg",
                "/images/toys/Redwoods/inhumanoids_redwoods_art_richardmarcej.jpg"
            ]
        },
        {
            name: "Redlen",
            description: "Leader of the Redwoods",
            image: "/images/toys/Redlen/inhumanoids_redlen_toy_pkg.jpg",
            additionalImages: [
                "images/toys/Redlen/inhumanoids_redlen_toy_pkg_side.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_pkg_back.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed2.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed3.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed4.jpg",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed5.png",
                "images/toys/Redlen/inhumanoids_redlen_toy_unboxed6.png"
            ]
        },
        {
            name: "Redsun",
            description: "Redwood warrior and scout",
            image: "/images/toys/Redsun/inhumanoids_redsun_toy_pkg.png",
            additionalImages: [
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg2.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg3.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg4.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg5.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg6.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_pkg7.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_unboxed.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_unboxed2.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_unboxed3.jpg",
                "/images/toys/Redsun/inhumanoids_redsun_toy_unboxed4.JPG",
                "/images/toys/Redsun/inhumanoids_redsun_toy_unboxed5.JPG"
            ]
        },
        {
            name: "Granite (Race)",
            description: "Rock-like race of Mutores",
            image: "/images/toys/Granites/inhumanoids_granite_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Granites/inhumanoids_granite_toy_pkg2.jpg",
                "/images/toys/Granites/inhumanoids_granite_toy_pkg3.jpg",
                "/images/toys/Granites/inhumanoids_granite_toy_pkg4.jpg",
                "/images/toys/Granites/inhumanoids_granite_toy_pkg5.jpg",
                "/images/toys/Granites/inhumanoids_granite_toy_unboxed.jpg",
                "/images/toys/Granites/inhumanoids_granite_toy_unboxed2.jpg",
                "/images/toys/Granites/inhumanoids_granites_art_richardmarcej.jpg"
            ]
        },
        {
            name: "Granok",
            description: "Leader of the Granites",
            image: "/images/toys/Granok/inhumanoids_granok_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Granok/inhumanoids_granok_toy_pkg2.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_pkg3.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_pkg4.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_stats_card.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_unboxed.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_unboxed2.jpg",
                "/images/toys/Granok/inhumanoids_granok_toy_unboxed3.jpg"
            ]
        },
        {
            name: "Magnakor",
            description: "The hot and cold (respectively) Mutores Pyre and Crygen combine to form Magnakor",
            image: "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg2.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg3.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg4.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg5.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_pkg_back.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_unboxed.jpg",
                "/images/toys/Magnakor/inhumanoids_magnakor_toy_unboxed2.JPG"
            ]
        },
        {
            name: "Trappeur",
            description: "Underground protection vehicle",
            image: "/images/toys/Trappeur/inhumanoids_trappeur_toy_pkg.jpg",
            additionalImages: [
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_pkg2.jpg",
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_pkg3.jpg",
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_unboxed.jpg",
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_unboxed2.jpg",
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_unboxed3.jpg",
                "/images/toys/Trappeur/inhumanoids_trappeur_toy_unboxed4.jpg"
            ]
        },
        {
            name: "Terrascout",
            description: "Underground exploration vehicle",
            image: "/images/toys/Terrascout/inhumanoids_terrascout_toy_pkg.JPG",
            additionalImages: [
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_pkg2.JPG",
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_unboxed.jpg",
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_unboxed2.jpg",
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_unboxed3.jpg",
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_unboxed4.jpg",
                "/images/toys/Terrascout/inhumanoids_terrascout_toy_unboxed5.jpg"
            ]
        },
        {
            name: "Unproduced Wave 2 Inhumanoids Toys",
            description: "Some of the toys that would have been produced for wave 2, had the cartoon been given another season. Images taken from the out of print book 'My Artwork and Designs at Hasbro 83'-89'' by Richard Marcej.",
            image: "/images/toys/unproduced/inhumanoids_unproduced_sslither.jpg",
            additionalImages: [
                "/images/toys/unproduced/inhumanoids_unproduced_toys_1.jpg",
                "/images/toys/unproduced/inhumanoids_unproduced_toys_2.jpg",
                "/images/toys/unproduced/inhumanoids_unproduced_tankmaster_toy_pkg_back.png",
                "/images/toys/unproduced/inhumanoids_unproduced_sslither.jpg",
                "/images/toys/unproduced/inhumanoids_diamond_crystal_mutore_sketch.jpg",
                "/images/toys/unproduced/inhumanoids_nightcrawler_art_richardmarcej.jpg",
                "/images/toys/unproduced/inhumanoids_sslither_art_richardmarcej.jpg"
            ]
        },
        {
            name: "Catalog Appearances",
            description: "Let the nostalgia wash over you...",
            image: "/images/toys/Catalogs/inhumanoids_catalog.jpg",
            additionalImages: [
                "/images/toys/Catalogs/inhumanoids_catalog1.jpg",
                "/images/toys/Catalogs/inhumanoids_sears_catalog_close_up.jpg",
                "/images/toys/Catalogs/inhumanoids_1986_sears_wish_book_pages530-531.jpg",
                "/images/toys/Catalogs/inhumanoids_uncut_cross_sell_sheet_richardmarcej.jpg"
            ]
        },
        {
            name: "Mobile Store Display",
            description: "Hanging mobile store display.",
            image: "/images/toys/MobileDisplay/inhumanoids_mobile_display1.jpg",
            additionalImages: [
                "/images/toys/MobileDisplay/inhumanoids_mobile_display2.jpg",
                "/images/toys/MobileDisplay/inhumanoids_mobile_display3.jpg",
                "/images/toys/MobileDisplay/inhumanoids_mobile_display4.jpg",
                "/images/toys/MobileDisplay/inhumanoids_mobile_display5.jpg",
                "/images/toys/MobileDisplay/inhumanoids_mobile_display6.jpg",
                "/images/toys/MobileDisplay/inhumanoids_mobile_display7.jpg",
            ]
        }
    ];

    return (
        <div id="toys" className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Toys</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {toys.map(toy => (
                    <ToyCard
                        key={toy.name}
                        toy={{
                            name: toy.name,
                            description: toy.description,
                            images: {
                                mainImage: toy.image,
                                additionalImages: toy.additionalImages || []
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ToyShowcase;