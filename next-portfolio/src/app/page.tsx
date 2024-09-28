"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { NavbarComponent } from "@/components/navbar";
import Wrapper from "@/components/Wrapper";
import { Tweet } from "@/components/tweet";
import { Techstack } from "@/components/techstack";
import LoadingVideo from "@/components/LoadingVideo";
import { InView } from "@/components/ui/InView";
import { Project } from "@/components/project";

// Utility function for simulating loading
const simulateLoad = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const inViewDefaultVariants = {
  hidden: { opacity: 0, y: 90, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentSection = useRef(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const loadAssets = async () => {
      await simulateLoad(3000);
      setIsLoading(false);
    };

    loadAssets();

    // Cleanup function
    return () => {
      setIsLoading(false);
    };
  }, []);

  // Detect mobile view based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust as per your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      currentSection.current = index;
      sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Throttling scroll event for better UX on mobile
  let scrollTimeout: NodeJS.Timeout | null = null;
  const handleScroll = (event: WheelEvent) => {
    // Only scroll if not on mobile or enough delay has passed
    if (scrollTimeout) return; // Throttle scroll

    if (!isMobile) {
      if (event.deltaY > 0) {
        scrollToSection(currentSection.current + 1);
      } else {
        scrollToSection(currentSection.current - 1);
      }
    }

    event.preventDefault(); // Prevent default scroll behavior

    // Add a small delay to throttle scroll
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 500);
  };

  useEffect(() => {
    // Only enable scroll for desktop views
    if (!isMobile) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-gray-100 scroll-smooth">
      <NavbarComponent />
      <Wrapper className="pb-24 sm:pb-32 lg:gap-x-0 xl:gap-x-8">
        {isLoading ? (
          <LoadingVideo />
        ) : (
          <>
            <div
              ref={(el) => {
                sectionsRef.current[0] = el;
              }}
              className="section"
            >
              <InView
                variants={inViewDefaultVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewOptions={{ margin: "-300px 0px -300px 0px" }}
              >
                <div className="pt-20">
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                    <Tweet
                      username="Peter Tam"
                      handle="Tamkc"
                      profileImage="/icon-192x192.png"
                      content="Hi, I'm Peter Tam, a Full-Stack Developer."
                    />
                  </h1>
                </div>
              </InView>
            </div>

            <div>
              <InView
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 90,
                    x: 50,
                    scale: 0.95,
                    filter: "blur(4px)",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  },
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewOptions={{ margin: "-500px 0px 0px 0px" }}
              >
                <div className="relative w-auto h-80 mb-4 flex items-center justify-center">
                  <Image
                    src="/say-hi.png"
                    alt="Illustration of a waving figure saying hi"
                    layout="fill"
                    objectFit="contain"
                  />
                  <div
                    id="tech"
                    ref={(el) => {
                      sectionsRef.current[1] = el;
                    }}
                    className="section"
                  ></div>
                </div>
              </InView>
            </div>

            <InView
              variants={inViewDefaultVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewOptions={{ margin: "-400px 0px -400px 0px" }}
            >
              <Techstack />
            </InView>

            <div
              id="project"
              ref={(el) => {
                sectionsRef.current[2] = el;
              }}
              className="section"
            ></div>

            <div>
              <InView
                variants={inViewDefaultVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewOptions={{ margin: "-400px 0px -400px 0px" }}
              >
                <Project />
              </InView>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
}
