import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative bg-gray-900 dark:bg-black min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] xl:min-h-[780px]">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 opacity-90 dark:opacity-80" />

            <div className="relative h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
                {/* Logo Container */}
                <div className="w-full max-w-4xl mx-auto flex items-center justify-center mb-6 sm:mb-8 lg:mb-12">
                    <img
                        src="/images/inhumanoids_logo_header.png"
                        alt="INHUMANOIDS CLUB - THE Inhumanoids Fansite"
                        className="w-full h-auto max-w-full max-h-[200px] sm:max-h-[300px] lg:max-h-[400px] xl:max-h-[780px] object-cover"
                        loading="eager"
                    />
                </div>

                {/* Text Content */}
                <div className="max-w-4xl mx-auto px-4 text-center space-y-2 sm:space-y-4">
                    <p className="text-sm sm:text-lg lg:text-xl text-gray-100 dark:text-white leading-relaxed dark:[text-shadow:-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000,2px_2px_1px_#000]">
                        Exploring the epic battle between Earth Corps and the terrifying Inhumanoids.
                    </p>
                    <p className="text-sm sm:text-lg lg:text-xl text-gray-100 dark:text-white leading-relaxed dark:[text-shadow:-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000,2px_2px_1px_#000]">
                        Look here for site update info.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;