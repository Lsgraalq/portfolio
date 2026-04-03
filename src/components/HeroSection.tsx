"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import StackedCards from './StackedCards';
import Link from 'next/link';

// Split text
const splitTextIntoSpans = (text: string) => {
  return text.split("").map((char, index) => (
    <span key={index} className="char inline-block opacity-0">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);

 
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Init timeline
    const tl = gsap.timeline({});

    // Init states
    tl.set([sloganRef.current?.querySelectorAll('.char')!], { opacity: 0 })
      .set(contentRef.current, { opacity: 1 }); 

    tl.to(introRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, "-=0.6");

    // Letters blink
    const chars = sloganRef.current?.querySelectorAll('.char')!;
    if (chars && chars.length > 0) {
      tl.to(chars, {
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
      });
    }
  }, { scope: containerRef }); 




  useGSAP(() => {
    // Nájdeme všetky elementy s triedou .card v našom wrappery
    const cards = gsap.utils.toArray(".card") as HTMLDivElement[];
    if (cards.length === 0) return;
     const isMobile = window.innerWidth < 768;



    // Vytvoríme hlavnú časovú os napojenú na scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textWrapperRef.current,
        start: isMobile ? "top 10%" : "top 30%" , // Začne, keď vrch kontajnera príde na vrch obrazovky
        end: "+=600",    // Ako dlho budeme scrollovať, kým animácia skončí (čím viac, tým pomalšie sa menia karty)
        scrub: 1,         // Plynulé pretáčanie podľa scrollovania
        pin: true,
        markers: false     // Zastaví scrollovanie stránky, kým sa neprehrajú karty
      },
    });

    

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen md:pt-45 pt-40 text-center px-5">
      

      {/* Main content */}
      <div ref={contentRef} className="opacity-0 pb-20">
        

        <div ref={sloganRef} className="2xl:text-[100px] 2xl:leading-32 text-[44px] leading-15 lg:text-6xl xl:text-[80px] xl:leading-25 lg:leading-20">
          {splitTextIntoSpans("Welcome!")} <br className='md:hidden flex'/> {splitTextIntoSpans("I engineer")} <br />
          {splitTextIntoSpans("complex web")} <br className='md:hidden flex'/> {splitTextIntoSpans("apps and craft")} <br />
            {splitTextIntoSpans("beautiful digital")} <br className='md:hidden flex'/> {splitTextIntoSpans("experiences")}

        </div>
        
      </div>
      <div className="md:grid md:grid-cols-2 flex flex-col md:px-15 px-5 ">
        <div className="col-span-1 text-2xl leading-9  md:text-4xl xl:text-4xl md:leading-12 2xl:text-4xl xl:leading-13 2xl:leading-15 flex flex-col mt-10" ref={textWrapperRef}>
    <div className="">A showcase of real-world web applications where clear business objectives are transformed into reliable, revenue-generating digital products.</div>
    <div className="flex flex-row  gap-10  mx-auto px-20 pt-10">
        <Link href="/work" className="border border-[#fffddb] relative inline-flex items-center justify-center h-20 w-50 hover:w-50 overflow-hidden font-medium transition-all duration-450 ease-out rounded-lg shadow-md group whitespace-nowrap">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-3xl duration-450 translate-x-full  group-hover:translate-x-0 bg-[#fffddb] text-[#FF3831] ease">
             See All
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#fffddb]  rounded-2xl text-3xl transition-all duration-450 transform group-hover:-translate-x-full ease">
              Portfolio
            </span>
          </Link>
      <div className="hidden  text-2xl align-middle items-center md:flex text-left font-regular">Partnering with ambitious brands &amp; inspiring people.</div>
    </div>
   
        </div>
        <div className="col-span-1 ">
        <StackedCards></StackedCards>
        </div>
      </div>
     

    </section>
  );
}