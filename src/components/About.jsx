import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import AnimatedTitle from './AnimatedTitle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {

  // Start GSAP Animation
  useGSAP( () => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      }
    })
    clipAnimation.to('.mask-clip-path', { width: '100vw', height: '100vh', borderRadius: '0'})
  } )
  // End GSAP Animation

  return (
    <div id='about' className='min-h-screen w-screen'>

      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        {/* Start Upper Heading */}
        <h2 className='font-general text-sm uppercase md:text-[10px]'>Welcome To Zentry</h2>
        {/* End Upper Heading */}

        {/* Start Lower Heading */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />
        {/* End Lower Heading */}

        {/* Start Subtext */}
        <div className='about-subtext'>
          <p>The Game of Games begins-Your life, now an epic MMORPG</p>
          <p>Zentry unites from countless games and platforms</p>
        </div>
        {/* End Subtext */}

      </div>

      {/* Start Image Part */}
      <div className='h-dvh w-screen' id='clip'>
        <div className='mask-clip-path about-image'>
          <img src="img/about.webp" alt="Background" className='absolute left-0 top-0 size-full object-cover' />
        </div>
      {/* End Image Part */}

      </div>

    </div>
  )
}

export default About