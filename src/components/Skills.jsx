import { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import { useFetchData } from '../hooks/useFetchData.js';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.35,
      ease: 'easeOut',
    },
  }),
};

const getIconComponent = (iconName) => {
  if (!iconName) return null;
  return SiIcons[iconName] || null;
};

const CategoryBlock = ({ title, skills, startIndex = 0 }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-base-content/90">{title}</h3>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, idx) => {
        const Icon = getIconComponent(skill.icon);
        const motionIndex = startIndex + idx;

        return (
          <motion.div
            key={skill.name}
            className="card bg-base-100/90 border border-base-300/70 shadow-sm"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={motionIndex}
            whileHover={{ scale: 1.04, y: -3, boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }}
          >
            <div className="card-body gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-base-content">
                    {skill.name}
                  </p>
                  <p className="text-xs text-base-content/60">
                    Proficiency: {skill.level}%
                  </p>
                </div>
              </div>

              <progress
                className="progress progress-primary h-1.5"
                value={skill.level}
                max="100"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  const { data, loading, error } = useFetchData('skill.json');

  const skills = useMemo(() => data?.skills ?? {}, [data]);

  const frontend = skills.frontend ?? [];
  const backend = skills.backend ?? [];
  const tools = skills.tools ?? [];

  if (loading) {
    return (
      <section id="skills" className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="flex justify-center py-16">
        <div className="alert alert-error max-w-md">
          <span>Failed to load skills: {error.message}</span>
        </div>
      </section>
    );
  }

  // Keep a running index so stagger feels continuous across categories
  let runningIndex = 0;

  return (
    <section id="skills" className="space-y-8 py-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Skills & Stack
        </h2>
        <p className="text-sm md:text-base text-base-content/70">
          A quick look at the frontend, backend, and tools I use to build
          modern web applications.
        </p>
      </div>

      <div className="space-y-10">
        {frontend.length > 0 && (
          <CategoryBlock
            title="Frontend"
            skills={frontend}
            startIndex={runningIndex}
          />
        )}
        {(() => {
          runningIndex += frontend.length;
          return null;
        })()}

        {backend.length > 0 && (
          <CategoryBlock
            title="Backend"
            skills={backend}
            startIndex={runningIndex}
          />
        )}
        {(() => {
          runningIndex += backend.length;
          return null;
        })()}

        {tools.length > 0 && (
          <CategoryBlock
            title="Tools & Platforms"
            skills={tools}
            startIndex={runningIndex}
          />
        )}
      </div>
    </section>
  );
};

export default Skills;

