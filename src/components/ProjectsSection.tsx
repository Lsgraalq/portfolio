import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProjectsSection() {
  return (
    <>
    <div className="h-screen m:px-15 px-5 pt-10 md:pt-70">
        <div className="text-center flex flex-col gap-10">
            <h2 className="md:text-[90px] text-5xl accent-color">Latest Projects</h2>
            <h3 className="md:text-4xl text-xl">Bridging the gap between heavy technical infrastructure and premium aesthetic interfaces.</h3>
        </div>

        <div className="md:pt-30 pt-15">
            <div className="flex flex-col md:grid md:grid-cols-3 md:gap-15 gap-20">

                <Link href={"/work/so-sehe-das-ich"} className="group col-span-1 ">
                    <div className="relative w-full md:h-160 h-110 rounded-xl">
                        <Image src={"/squareImage.png"} fill alt='caseus' className='z-[-1] rounded-xl'></Image>
                        <Image src={"/squareImage.png"} fill alt='caseus' className='group-hover:scale-90  object-cover transition-transform duration-500  rounded-xl'></Image>
                    </div>
                    <div className="px-2 pt-5 group-hover:text-[#FF3831] duration-400">
                        <h4 className='font-regular text-3xl pb-3'>Caseus</h4>
                        <div className="flex flex-row gap-2 font-regular text-xl">
                            <h5 className="">Analitycs, </h5>
                            <h5 className="">SEO, </h5>
                            <h5 className="">Architecture</h5>
                        </div>
                    </div>
                </Link>


                 <Link href={"/work/caseus"} className="group col-span-1 ">
                    <div className="relative w-full md:h-135 h-110 rounded-xl">
                        <Image src={"/squareImage.png"} fill alt='caseus' className='z-[-1] rounded-xl'></Image>
                        <Image src={"/squareImage.png"} fill alt='caseus' className='group-hover:scale-90  object-cover transition-transform duration-500  rounded-xl'></Image>
                    </div>
                    <div className="px-2 pt-5 group-hover:text-[#FF3831] duration-400">
                        <h4 className='font-regular text-3xl pb-3'>Caseus</h4>
                        <div className="flex flex-row gap-2 font-regular text-xl">
                            <h5 className="">Analitycs, </h5>
                            <h5 className="">SEO, </h5>
                            <h5 className="">Architecture</h5>
                        </div>
                    </div>
                </Link>



                 <Link href={"/work/autotransfer"}  className="group col-span-1 ">
                    <div className="relative w-full h-110 rounded-xl">
                        <Image src={"/squareImage.png"} fill alt='caseus' className='z-[-1] rounded-xl'></Image>
                        <Image src={"/squareImage.png"} fill alt='caseus' className='group-hover:scale-90  object-cover transition-transform duration-500  rounded-xl'></Image>
                    </div>
                    <div className="px-2 pt-5 group-hover:text-[#FF3831] duration-400">
                        <h4 className='font-regular text-3xl pb-3'>Caseus</h4>
                        <div className="flex flex-row gap-2 font-regular text-xl">
                            <h5 className="">Analitycs, </h5>
                            <h5 className="">SEO, </h5>
                            <h5 className="">Architecture</h5>
                        </div>
                    </div>
                </Link>


            </div>
        </div>

    </div>
    
    </>
  )
}

export default ProjectsSection