"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Musíme registrovať ScrollTrigger pre Next.js
gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  { id: 1, title: "01. Architecture", color: "bg-gradient-to-br from-[#181616] to-[#FF3831]/5" },
  { id: 2, title: "02. Development", color: "bg-gradient-to-br from-[#181616] to-[#FF3831]/15" },
  { id: 3, title: "03. Deployment", color: "bg-gradient-to-br from-[#181616] to-[#FF3831]/30" },
  { id: 4, title: "04. Maintenance", color: "bg-gradient-to-br from-[#181616] to-[#FF3831]/60" },
];

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    // Nájdeme všetky elementy s triedou .card v našom wrappery
    const cards = gsap.utils.toArray(".card") as HTMLDivElement[];
    if (cards.length === 0) return;
     const isMobile = window.innerWidth < 768;



    // Vytvoríme hlavnú časovú os napojenú na scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsWrapperRef.current,
        start: isMobile ? "top 50%" : "top 30%" , // Začne, keď vrch kontajnera príde na vrch obrazovky
        end: "+=600",    // Ako dlho budeme scrollovať, kým animácia skončí (čím viac, tým pomalšie sa menia karty)
        scrub: 1,         // Plynulé pretáčanie podľa scrollovania
        pin: true,
        markers: false        // Zastaví scrollovanie stránky, kým sa neprehrajú karty
      },
    });

    // Pripravíme začiatočné pozície: Karta 1 je viditeľná, ostatné sú dole
    gsap.set(cards[0], { yPercent: 0, opacity: 1 });
    gsap.set(cards.slice(1), { yPercent: 100, opacity: 0 });

    // --- LOGIKA STOHOVANIA KARIET ---
    // Prechádzame karty od druhej po poslednú
    cards.forEach((card, index) => {
      if (index === 0) return; // Prvú kartu neanimujeme dovnútra

      // 1. Nová karta (index) prichádza zospodu
      tl.to(card, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
      }, "+=0.2"); // Malá pauza medzi kartami

      // 2. Všetky PREDCHÁDZAJÚCE karty sa zmenšia a posunú trošku hore
      // To robí ten pekný 3D efekt padania dozadu
      for (let j = 0; j < index; j++) {
        tl.to(cards[j], {
          scale: "-=0.05",    // Každá karta vzadu sa zmenší o 5%
          yPercent: "-=2",    // A posunie trošku hore
          opacity: "-=0.60",  // A trošku stmavne
          duration: 1,
        }, "<"); // "<" znamená, že sa to deje SÚČASNE s príchodom novej karty
      }
    });

  }, { scope: containerRef });

  return (
    // Hlavný obal, ktorý potrebuje obrovskú výšku, aby bolo kam scrollovať
    // Aj keď je dnu len jeden pripnutý element
    <div ref={containerRef} className="relative w-full pt-10">
      
      {/* Tu sa to celé zastaví (pin) */}
      <div 
        ref={cardsWrapperRef} 
        className="relative flex items-center justify-center md:justify-end  2xl:justify-center h-screen w-full overflow-hidden pt-20 md:pt-0"
      >
        {CARDS_DATA.map((card, index) => (
          <div
            key={card.id}
            className={`card absolute w-[90%] md:w-[60%] xl:w-[75%] h-[30vh] md:h-[40vh] rounded-3xl p-10 flex flex-col justify-between shadow-2xl border border-white/10 ${card.color}`}
            style={{ 
              zIndex: index + 1, // Aby bola každá ďalšia karta NAD tou predchádzajúcou
              top: `${index * 15}px` // Jemný posun nadol, aby bolo vidno okraje spodných kariet, ešte kým neprídu
            }}
          >
           
            <h2 className="text-4xl md:text-4xl xl:text-4xl 2xl:text6xl font-slay font-bold text-white uppercase">
              {card.title}
            </h2>
            
            <div className="flex justify-end">
              <span className="text-white/50 text-xl font-mono">0{card.id}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}