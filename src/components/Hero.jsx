import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchData } from "../hooks/useFetchData.js";

const FALLBACK_TITLES = ["MERN Stack Developer", "Frontend Developer"];
const TYPING_SPEED = 80; // ms per character
const PAUSE_BETWEEN = 1200; // ms pause when full word is shown

const Hero = () => {
  const { data, loading, error } = useFetchData("personalInfo.json");
  const imageRef = useRef(null);

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { personalInfo, socialLinks } = useMemo(
    () => ({
      personalInfo: data?.personalInfo ?? {},
      socialLinks: data?.socialLinks ?? {},
    }),
    [data],
  );

  // Designations: prefer from JSON, fallback to defaults
  const designations =
    Array.isArray(personalInfo.designations) && personalInfo.designations.length
      ? personalInfo.designations
      : FALLBACK_TITLES;

  // Typewriter effect using JSON designations
  useEffect(() => {
    if (!designations.length) return;

    const fullText = designations[currentTitleIndex] || designations[0];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing characters
          if (displayedText.length < fullText.length) {
            setDisplayedText(fullText.slice(0, displayedText.length + 1));
          } else {
            // Word fully typed, pause then start deleting
            setIsDeleting(true);
          }
        } else if (displayedText.length > 0) {
          // Deleting characters
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next designation
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % designations.length);
        }
      },
      isDeleting ? TYPING_SPEED / 1.5 : TYPING_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [designations, currentTitleIndex, displayedText, isDeleting]);

  // Extra pause when a word is fully typed
  useEffect(() => {
    const fullText = designations[currentTitleIndex] || designations[0];
    if (!isDeleting && displayedText === fullText) {
      const pauseId = setTimeout(() => setIsDeleting(true), PAUSE_BETWEEN);
      return () => clearTimeout(pauseId);
    }
    return undefined;
  }, [designations, currentTitleIndex, displayedText, isDeleting]);

  // GSAP floating animation for profile image
  useGSAP(
    () => {
      if (!imageRef.current) return;
      gsap.to(imageRef.current, {
        y: -12,
        duration: 2.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: imageRef },
  );

  if (loading) {
    return (
      <section
        id="home"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <span className="loading loading-spinner loading-lg text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="home"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="alert alert-error max-w-md">
          <span>Failed to load profile info: {error.message}</span>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="grid min-h-[70vh] grid-cols-1 items-center gap-10 py-8 md:grid-cols-2 md:py-12"
    >
      {/* Right on mobile, left on desktop: Profile image */}
      <div className="order-first flex justify-center md:order-last">
        <div
          ref={imageRef}
          className="relative inline-flex items-center justify-center rounded-3xl border border-base-300 bg-base-100/70 p-2 shadow-xl backdrop-blur"
        >
          <div className="h-52 w-52 overflow-hidden rounded-3xl border-4 border-primary/70 md:h-64 md:w-64">
            {personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* soft glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-secondary/10 to-accent/20 blur-2xl" />
        </div>
      </div>

      {/* Left on desktop, bottom on mobile: Text */}
      <motion.div
        className="order-last space-y-6 md:order-first"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-secondary">
          Hello, I am
        </p>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight text-base-content md:text-4xl lg:text-5xl">
            {personalInfo.name || "Md Ziaul Haque Arafat"}
          </h1>

          <div className="flex items-center gap-2 text-lg md:text-xl">
            <span className="text-base-content/70">I&apos;m a</span>
            <span className="font-semibold text-primary">
              {displayedText}
              <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-primary/80 align-middle" />
            </span>
          </div>

          {personalInfo.location && (
            <p className="text-sm font-medium text-base-content/60">
              Based in {personalInfo.location}
            </p>
          )}
        </div>

        <p className="max-w-xl text-sm md:text-base text-base-content/80">
          {personalInfo.introduction}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {personalInfo.resumeLink && (
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm md:btn-md"
            >
              Download Resume
            </a>
          )}

          <a href="#contact" className="btn btn-outline btn-sm md:btn-md">
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-base-content/70">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-base-200 text-base-content shadow-sm">
                <FaGithub />
              </span>
              <span className="hidden text-xs md:inline">GitHub Profile</span>
            </a>
          )}

          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-base-200 text-base-content shadow-sm">
                <FaLinkedin />
              </span>
              <span className="hidden text-xs md:inline">LinkedIn Profile</span>
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
