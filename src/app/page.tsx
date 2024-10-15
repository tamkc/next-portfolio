"use client";

// External libraries
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";

// Absolute imports (from "@/components/")
import { Navbar } from "@/components/navbar";
import Wrapper from "@/components/Wrapper";
import { Tweet } from "@/components/Tweet";
import { TechStack } from "@/components/TechStack";
import LoadingVideo from "@/components/LoadingVideo";
import { InView } from "@/components/ui/InView";
import Footer from "@/components/ui/Footer";
import { Project } from "@/components/Project";
import GetInTouch from "@/components/GetInTouch";

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
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Preloadable images
  const images = useMemo(() => ["/say-hi.png", "/icon-192x192.png"], []);

  const techStackImages = useMemo(
    () => [
      "/logos/python.png",
      "/logos/javascript.png",
      "/logos/php.png",
      "/logos/typescript.png",
      "/logos/node.png",
      "/logos/react.png",
      "/logos/nextjs.png",
      "/logos/vue.png",
      "/logos/vite.png",
      "/logos/postgres.png",
      "/logos/mysql.png",
      "/logos/amplify.png",
      "/logos/ec2.png",
      "/logos/googlecloud.png",
      "/logos/docker.png",
      "/logos/git.png",
    ],
    []
  );

  const projectImages = useMemo(
    () => [
      "/projects/tigcase.jpg",
      "/projects/im-dashboard.jpg",
      "/projects/payroll.png",
      "/projects/payroll-webapp.jpg",
      "/projects/odoo-erp.png",
      "/projects/vendorseek.png",
    ],
    []
  );

  const imagesToPreload = useMemo(
    () => [...images, ...techStackImages, ...projectImages],
    [images, techStackImages, projectImages]
  );

  useEffect(() => {
    const loadAssets = async () => {
      const loadImage = (src: string): Promise<void> =>
        new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = (err: string | Event) => reject(err); // Use a more general type
        });

      try {
        await Promise.all(imagesToPreload.map((image) => loadImage(image)));
        await simulateLoad(3000);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false);
      }
    };

    loadAssets();
  }, [imagesToPreload]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      currentSection.current = index;
      const section = sectionsRef.current[index];
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (scrollTimeout.current) {
        return; // Prevent rapid firing
      }

      const scrollDistance = Math.abs(event.deltaY);
      if (scrollDistance < 40) {
        return; // Ignore small scrolls
      }

      event.preventDefault();

      if (!isMobile) {
        if (event.deltaY > 0) {
          scrollToSection(currentSection.current + 1);
        } else {
          scrollToSection(currentSection.current - 1);
        }
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null; // Clear the timeout after scrolling
      }, 300);
    },
    [isMobile]
  );

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll, isMobile]);

  return (
    <div className="relative min-h-screen bg-gray-100 scroll-smooth">
      {isLoading ? (
        <LoadingVideo />
      ) : (
        <>
          <Wrapper className="pb-24 sm:pb-32 lg:gap-x-0 xl:gap-x-8">
            <Navbar scrollToSection={scrollToSection} />

            <div
              id="home"
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
                  fill
                  style={{ objectFit: "contain" }} // Use style for objectFit
                  className="your-class-name" // Add any necessary classes
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes based on your layout
                />
              </div>
            </InView>
            <div
              id="tech"
              ref={(el) => {
                sectionsRef.current[1] = el;
              }}
              className="section"
            />
            <InView
              variants={inViewDefaultVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewOptions={{ margin: "-400px 0px -400px 0px" }}
            >
              <TechStack />
            </InView>

            <div
              id="project"
              ref={(el) => {
                sectionsRef.current[2] = el;
              }}
              className="section"
            >
              <InView
                variants={inViewDefaultVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewOptions={{ margin: "-400px 0px -400px 0px" }}
              >
                <Project />
              </InView>
            </div>
            {/* Add InView for the GetInTouch section */}
            <InView
              variants={inViewDefaultVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewOptions={{ margin: "-400px 0px -400px 0px" }}
            >
              <div
                id="contact"
                ref={(el) => {
                  sectionsRef.current[3] = el;
                }}
                className="section"
              >
                <GetInTouch />
              </div>
            </InView>
          </Wrapper>
          <Footer />
        </>
      )}
    </div>
  );
}
