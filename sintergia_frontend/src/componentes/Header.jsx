'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Youtube, Twitter, Music } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar el tamaño del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enlaces de navegación
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/services' },
    { name: 'Nosotros', href: '/portafolio' },
    { name: 'Educación', href: '/educacion' },
    { name: 'Contacto', href: '/contacto' }
  ];

  // Iconos de redes sociales
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/sintergia', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/sintergia', label: 'YouTube' },
    { icon: Twitter, href: 'https://x.com/sintergia', label: 'X' },
    { icon: Music, href: 'https://tiktok.com/@sintergia', label: 'TikTok' } // Usando Music como alternativa
  ];

  return (
    <header 
      className={` bg-black shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo - Izquierda */}
        <Link href="/" className="flex items-center">
          
          <span className={`font-bold  from-indigo-600 to-emerald-500 bg-clip-text text-transparent transition-all ${
            scrolled ? 'text-xl' : 'text-3xl'
          }`}>
            <div className="w-20 h-20 flex items-center justify-center transition-all duration-300" style={{ transform: scrolled ? 'scale(0.7)' : 'scale(1)' }}>
              <Image 
              src='/logo.png'
              width={scrolled ? 60 : 80}
              height={scrolled ? 60 : 80}
              alt='Logo'
              className= 'transition-all duration-300'
              >
                
              </Image>
            </div>
          </span>
        </Link>

        {/* Navegación - Centro (solo en desktop) */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`text-gray-100  hover:text-indigo-600 transition-colors duration-300 font-medium ${
                    scrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes Sociales - Derecha (solo en desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((social) => (
            <Link 
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon size={scrolled ? 20 : 24} />
            </Link>
          ))}
        </div>

        {/* Botón Menú Mobile */}
        <button
          aria-label="Abrir menú"
          className="md:hidden text-gray-600 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú Mobile */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="font-bold text-2xl" onClick={() => setIsOpen(false)}>
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                Sintergia
              </span>
            </Link>
            <button
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="mb-8">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xl font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-300 block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <Link 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-indigo-600 transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={28} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}