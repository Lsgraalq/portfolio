"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


// Pomocná funkcia pre blikanie textu
const splitTextIntoSpans = (text: string) => {
  return text.split("").map((char, index) => (
    <span key={index} className="char inline-block opacity-0">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

function Header() { 
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Referencie pre GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);  
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  // --- GSAP ANIMÁCIA ---
  useGSAP(() => {
    // 1. Uložíme menu mimo obrazovku zvrchu
    gsap.set(overlayRef.current, { yPercent: -100 });

    tl.current = gsap.timeline({ paused: true });

    // 2. Menu vyletí zvrchu dole
    tl.current.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.8,
      ease: "expo.inOut"
    });

    // 3. Tvoje blikanie textu
    const chars = overlayRef.current?.querySelectorAll('.char')!;
    if (chars && chars.length > 0) {
      tl.current.to(chars, {
        keyframes: {
          "0%": { opacity: 0 },
          "20%": { opacity: 0.5 },  
          "80%": { opacity: 0.3 }, 
          "100%": { opacity: 1 },  
          easeEach: "power1.inOut"
        },
        duration: 0.3, 
        stagger: {
          amount: 0.6,     
          from: "random"  
        }
      }, "-=0.4"); // Začne blikať kým ešte dopadá pozadie
    }
  }, { scope: containerRef });

  // 4. Spustenie animácie pri kliku
  useEffect(() => {
    if (menuOpen) {
        tl.current?.timeScale(1);
        tl.current?.play();
    } else {
        tl.current?.timeScale(1.7);
        tl.current?.reverse();
    }
  }, [menuOpen]);

  return (
    <div ref={containerRef}>
      
      {/* TVOJ PÔVODNÝ HEADER */}
      <div className={`md:px-15 px-6 md:grid md:grid-cols-3 fixed top-0 md:pt-10 pt-5 w-full flex flex-row justify-between z-41 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 z-[-41]'
      }`}>  
        <div className="md:col-span-1 hidden md:flex md:flex-col ">
          <Link href="/work" className="text-lg hover:text-[#FF3831] duration-300 transition-all ease-in font-regular w-fit">Work</Link>
          <Link href="/services" className="text-lg hover:text-[#FF3831] duration-300 transition-all ease-in font-regular w-fit">Services</Link>
          <Link href="/pet-projects" className="text-lg hover:text-[#FF3831] duration-300 transition-all ease-in font-regular w-fit">Pet Project</Link>
          <Link href="/work" className="text-lg hover:text-[#FF3831] duration-300 transition-all ease-in font-regular w-fit">Skills</Link>
        </div>
        
        <div className="md:text-4xl text-2xl col-span-1 md:text-center text-left items-center flex md:inline uppercase">merinets.xyz</div>
        
        <div className="md:col-span-1 text-end hidden md:inline">
          <Link href="/contact" className="relative inline-flex items-center justify-center h-16 w-50 hover:w-59 overflow-hidden font-medium transition-all duration-450 ease-out rounded-lg shadow-md group whitespace-nowrap">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-xl duration-450 translate-x-full text-[#FF3831] bg-[#fffddb] group-hover:translate-x-0 ease">
              Good Decision !
            </span>
            <span className="absolute flex items-center justify-center w-full h-full bg-[#FF3831] text-[#fffddb] text-xl transition-all duration-450 transform group-hover:-translate-x-full ease">
              Contact Me
            </span>
          </Link>
        </div>

      
        <div className="md:hidden flex">
          <button className="relative z-50 w-12 h-12 bg-[#FF3831] rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <video 
  src="./Flower.webm"      
  autoPlay  
  muted         
  playsInline   
  className="w-full" 
/>
          </button>
        </div>
      </div>

   
    <div ref={overlayRef} className="fixed inset-0 z-40 h-screen bg-[#181616] ">
        <div className="flex flex-col items-center justify-center gap-5 pt-50">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-3xl">
            {splitTextIntoSpans("Home")}
            </Link>
            <Link href="/work" onClick={() => setMenuOpen(false)} className="text-3xl">
            {splitTextIntoSpans("Work")}
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="text-3xl">
            {splitTextIntoSpans("Services")}
            </Link>
            <Link href="/pet-projects" onClick={() => setMenuOpen(false)} className="text-3xl">
            {splitTextIntoSpans("Pet Projects")}
            </Link>
            <Link href="/skills" onClick={() => setMenuOpen(false)} className="pb-10 text-3xl">
            {splitTextIntoSpans("Skills")}
            </Link>
            
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="relative inline-flex items-center justify-center h-14 w-40 hover:w-59 overflow-hidden font-medium transition-all duration-450 ease-out rounded-lg shadow-md group whitespace-nowrap">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#FF3831] bg-[#fffddb] text-xl duration-450 translate-x-full group-hover:translate-x-0 ease">
                Good Decision !
            </span>
            <span className="absolute flex items-center justify-center w-full h-full bg-[#FF3831] text-[#fffddb] text-xl transition-all duration-450 transform group-hover:-translate-x-full ease">
                Contact Me
            </span>
            </Link>
        </div>
        <div className="pt-25 flex flex-row justify-between px-6">
            <a href='mailto:ilya.merinec@gmail.com' className="text-[#FF3831] font-regular text-sm font-thin">{splitTextIntoSpans("ilya.merinec@gmail.com")}</a>
            <a className="text-[#FF3831] font-regular text-sm font-thin" href="https://www.linkedin.com/in/illia-m-2b3221360/">{splitTextIntoSpans("Linkedin")}</a>
        </div>
       
            <video 
  src="./cat_rolling.webm" 
  autoPlay      
  loop          
  muted         
  playsInline   
  className="fixed bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-none w-16" 
/>

        
    </div>

    </div>
  )
}

export default Header