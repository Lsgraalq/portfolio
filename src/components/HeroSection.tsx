"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

  const slogan = "Driven by passion. Built with precision.";
  const myHexID = "0x6D6572696E657473";

  useGSAP(() => {
    // Init timeline
    const tl = gsap.timeline({});

    // Init states
    tl.set([sloganRef.current?.querySelectorAll('.char')!], { opacity: 0 })
      .set(contentRef.current, { opacity: 1 }); 

    // Hi show
    

    

    // Intro hide
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

  return (
    <section ref={containerRef} className="h-screen pt-30 text-center">
      

      {/* Main content */}
      <div ref={contentRef} className="opacity-0">
        
        <h2 className="">
          {myHexID}
        </h2>

        <p ref={sloganRef} className="">
          {splitTextIntoSpans(slogan)}
        </p>
        
      </div>
    </section>
  );
}