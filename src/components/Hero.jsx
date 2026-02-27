import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// To ScrollTrigger to work, we need to register it with GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // To manage the current video index
  const [currentIndex, setCurrentIndex] = useState(1);
  // To track if the user has clicked on the mini video
  const [hasClicked, setHasClicked] = useState(false);
  // To manage the loading state of the videos
  const [isLoading, setIsLoading] = useState(true);
  // To track how many videos have loaded
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Total number of videos available
  const totalVideos = 4;
  // Ref for the next video element to control playback
  const nextVideoRef = useRef(null);

  // Handler to increment the count of loaded videos when a video finishes loading
  const handleVideoload = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Calculate the index of the upcoming video based on the current index and total videos
  const upcomingVideoindex = (currentIndex % totalVideos) + 1;

  // Handler for when the mini video is clicked, which sets the current index to the upcoming video index and marks that the user has clicked
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoindex);
  };

  // Effect to check if all videos have loaded, and if so, set the loading state to false
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Helper function to get the video source URL based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // Start GSAP
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  // End GSAP

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Start Loading Screen */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      {/* End Loading Screen */}

      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        {/* Start Video */}
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoindex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoload}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoload}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoload}
          />
        </div>
        {/* End Video */}

        {/* Start White Lower Text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        {/* End White Lower Text */}

        {/* Start Upper Text */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              {" "}
              redefi<b>n</b>e{" "}
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter The Metagame Layer <br />
              Unleash The Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-1 gap-1"
            />
          </div>
        </div>
        {/* End Upper Text */}
      </div>

      {/* Start Dark Lower Text */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
      {/* End Dark Lower Text */}
    </div>
  );
};

export default Hero;
