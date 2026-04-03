"use client"
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

interface SkillProps {
  title: string;
  features: string[];
  images: string[];
  link: string;
}

export default function Skill({ title, features, images, link }: SkillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.killTweensOf([containerRef.current, ".flying-image", ".letter-feature", "link-ref"]);

    // 1. Layout physics: pushing neighbors down

    gsap.to(textRef.current, {
    color:"#fffddb",    
    })
    gsap.to(containerRef.current, {
      paddingTop: "300px",
      duration: 0.5,
      ease: "power4.out",
      
    });

    // 2. Decorative: random image explosion
    gsap.set(".flying-image", { opacity: 0, y: 200, scale: 1, rotation: 0 });
    gsap.to(".flying-image", {
      opacity: 1,
      x: "random(-50, 20)",
      y: "random(-140, 60)",
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    // 3. Decorative: random letter flickering
    gsap.set(".letter-feature", { opacity: 0 });
    gsap.to(".letter-feature", {
      keyframes: {
        "0%": { opacity: 0 },
        "20%": { opacity: 0.7 },
        "80%": { opacity: 0.4 },
        "100%": { opacity: 1 },
        easeEach: "power1.inOut"
      },
      duration: 0.2,
      stagger: {
        amount: 0.45,
        from: "random"
      }
    });

    gsap.set(".link-ref", {opacity:0,});
    gsap.to(".link-ref", {
      opacity: 1,
      duration: 0.5,
      
    });

    
  });


 

  const handleMouseLeave = contextSafe(() => {
    gsap.killTweensOf([containerRef.current, ".flying-image", ".letter-feature", "link-ref"]);

    // Fast layout reset
    gsap.to(containerRef.current, {
      paddingTop: "0px",
      duration: 0.20,
      ease: "power2.in"
    });

    // Instant hide for nested elements
    gsap.to([".flying-image", ".letter-feature"], {
      opacity: 0,
      duration: 0.05,
      ease: "power1.in"
    });
    
    gsap.to(".link-ref", {
    opacity:0,
    duration:0.5,
  });

  gsap.to(textRef.current, {
    color:"#FF3831",    
    })


});

  
  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative py-10 cursor-pointer "
    >
      <h2 ref={textRef} className="text-[105px] font-bold text-center uppercase pointer-events-none accent-color">
        {title}
      </h2>

      <div className="absolute top-[120px] inset-x-0 mx-auto flex items-center justify-center gap-10 w-full max-w-7xl pointer-events-none">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flying-image opacity-0 relative w-[300px] h-[170px]"> 
              <Image src={img} alt="skill icon" fill className="object-cover rounded-3xl" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 max-w-2xl text-left">
          {features.map((feat, i) => (
            <p key={i} className="text-3xl leading-10">
              {feat.split('').map((char, index) => (
                <span key={index} className="letter-feature opacity-0">
                  {char}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="relative z-30 mt-auto pb-10 text-center link-ref opacity-0" >
        <Link href={`/services/${link}`}  className=' hover:underline-offset-3 transition-all hover:underline duration-400 hover:text-[#FF3831] text-[#ff767a] text-2xl '>Learn more</Link>
      </div>
    </div>
  );
}