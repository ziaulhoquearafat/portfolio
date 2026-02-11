import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGlobeAmericas, FaCameraRetro, FaRoute } from 'react-icons/fa';
import { useFetchData } from '../hooks/useFetchData.js';

const SEO_KEYWORD = 'SEO and search engine dynamics';
const MERN_KEYWORD = 'MERN Stack Developer';

const getHobbyIcon = (hobby) => {
  const lower = hobby.toLowerCase();
  if (lower.includes('photography')) return FaCameraRetro;
  if (lower.includes('travel')) return FaRoute;
  if (lower.includes('codewars') || lower.includes('problem')) return FaCode;
  if (lower.includes('exploring') || lower.includes('technolog')) return FaGlobeAmericas;
  return FaCode;
};

const About = () => {
  const { data, loading, error } = useFetchData('about.json');

  const aboutMe = useMemo(() => data?.aboutMe ?? {}, [data]);

  const journey = aboutMe.description?.journey ?? '';
  const passion = aboutMe.description?.passion ?? '';
  const personality = aboutMe.description?.personality ?? '';
  const hobbies = aboutMe.hobbies ?? [];

  // Helper: highlight specific phrases inside journey text
  const renderJourneyWithHighlights = () => {
    if (!journey) return null;

    const phrases = [MERN_KEYWORD, SEO_KEYWORD];
    let parts = [journey];

    phrases.forEach((phrase, phraseIndex) => {
      const nextParts = [];
      parts.forEach((part, partIndex) => {
        if (typeof part !== 'string') {
          nextParts.push(part);
          return;
        }

        const split = part.split(phrase);
        split.forEach((chunk, i) => {
          if (chunk) {
            nextParts.push(chunk);
          }
          if (i < split.length - 1) {
            nextParts.push(
              <span
                key={`${phrase}-${phraseIndex}-${partIndex}-${i}`}
                className="font-semibold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded"
              >
                {phrase}
              </span>,
            );
          }
        });
      });
      parts = nextParts;
    });

    return parts;
  };

  if (loading) {
    return (
      <section id="about" className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="flex justify-center py-16">
        <div className="alert alert-error max-w-md">
          <span>Failed to load about content: {error.message}</span>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="about"
      className="py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="rounded-3xl border border-base-300/60 bg-base-200/50 p-6 shadow-lg backdrop-blur-lg md:p-10">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {aboutMe.title || 'My Journey & Who I Am'}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          {/* Left: Journey / Passion / Personality */}
          <div className="space-y-6">
            <div className="card bg-base-100/80 shadow-sm border border-base-300/70">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-base-content">
                    Journey
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-base-content/80 leading-relaxed">
                    {renderJourneyWithHighlights()}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-base-content">
                    Passion
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-base-content/80 leading-relaxed">
                    {passion}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-base-content">
                      Personality
                    </h3>
                    <span className="badge badge-outline badge-sm border-secondary/70 text-secondary">
                      Codewars Active
                    </span>
                  </div>
                  <p className="mt-1 text-sm md:text-base text-base-content/80 leading-relaxed">
                    {personality}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hobbies */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-wide text-base-content/70">
              Hobbies & Interests
            </h3>

            <div className="grid gap-4">
              {hobbies.map((hobby) => {
                const Icon = getHobbyIcon(hobby);
                return (
                  <motion.div
                    key={hobby}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="card bg-base-100/90 border border-base-300/70 shadow-sm cursor-default"
                  >
                    <div className="card-body flex flex-row items-center gap-3 py-4">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium text-base-content">
                        {hobby}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;

