import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for dark mode preference without localStorage conflicts
        const darkModeEnabled = document.documentElement.classList.contains('dark');
        setIsDarkMode(darkModeEnabled);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        // Only use localStorage if it's available
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('darkMode', (!isDarkMode).toString());
            }
        } catch (e) {
            // Silently handle localStorage errors
        }
    };

    const navItems = [
        { title: 'Characters', href: '#characters' },
        { title: 'Episodes', href: '#episodes' },
        { title: 'Toys', href: '#toys' },
        { title: 'Comics', href: '#comics' },
        { title: 'Fan Art', href: '#fanart' }
    ];

    return (
        <nav className="bg-indigo-600 dark:bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Title - Responsive sizing */}
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            className="font-bold text-lg sm:text-xl lg:text-2xl hover:text-indigo-200 transition-colors"
                        >
                            {/* Show abbreviated version on mobile */}
                            <span className="block sm:hidden">INHUMANOIDS CLUB</span>
                            <span className="hidden sm:block lg:hidden">INHUMANOIDS CLUB</span>
                            <span className="hidden lg:block">INHUMANOIDS CLUB - THE Inhumanoids Fansite</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navItems.map(item => (
                            <a
                                key={item.title}
                                href={item.href}
                                className="hover:text-indigo-200 transition-colors whitespace-nowrap text-sm lg:text-base"
                            >
                                {item.title}
                            </a>
                        ))}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun size={20} className="text-yellow-300" />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button and dark mode toggle */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun size={20} className="text-yellow-300" />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-indigo-500 dark:border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map(item => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;