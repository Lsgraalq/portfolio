import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Skill from './Skill';


function WhyMe() {
    
   const myServices = [
    {
      title: "End-to-End Development",
      features: [
        "Lightning-fast load speeds (Next.js)", 
        "Seamless content management (Sanity)", 
        "Scalable & secure infrastructure"      
      ],
      images: ["/nextjs.webp", "/react.webp"],
      link: "development"
    },
    {
      title: "Premium Experience", 
      features: [
        "Cinematic motion design",          
        "Apple-grade interface fluidity",    
        "Interactive storytelling & UX"     
      ],
      images: ["/figma.webp", "/gsap.webp"],
      link: "experience"
    },
    {
      title: "Growth & Analytics", 
      features: [
        "Technical SEO optimization",        
        "Deep user behavior insights",       
        "Conversion-driven architecture"     
      ],
      images: ["/analitycs.webp", "/vercel.webp"],
      link: "growth"
    }
  ];

    return (
   <>
   <div className="mx-15  h-[200vh] hidden md:flex md:flex-col pt-150 md:pb-150" >
        <h4 className="text-center text-[100px] mx-auto xl:max-w-[40%] pb-25">I know what I'm good at</h4>
        
            {myServices.map((service, index) => (
        <Skill
            key={index}
          title={service.title}
          features={service.features}
          images={service.images}
          link={service.link}
        />
      ))}
        
    </div>
    </>
  )
}

export default WhyMe