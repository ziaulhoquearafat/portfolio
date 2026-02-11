import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaGraduationCap } from 'react-icons/fa';
import { useFetchData } from '../hooks/useFetchData.js';

const getEducationIcon = (item) => {
  const inst = (item.institution || '').toLowerCase();
  if (inst.includes('programming hero')) return FaCertificate;
  if (inst.includes('national university')) return FaGraduationCap;
  return FaGraduationCap;
};

const Education = () => {
  const { data, loading, error } = useFetchData('education.json');

  // Professional / career-relevant first, then academic
  const sortedEducation = useMemo(() => {
    const list = data?.education ?? [];
    return [...list].sort((a, b) => {
      const aProf = (a.type || '').toLowerCase().includes('professional') ? 0 : 1;
      const bProf = (b.type || '').toLowerCase().includes('professional') ? 0 : 1;
      return aProf - bProf;
    });
  }, [data]);

  if (loading) {
    return (
      <section id="education" className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="education" className="flex justify-center py-16">
        <div className="alert alert-error max-w-md">
          <span>Failed to load education: {error.message}</span>
        </div>
      </section>
    );
  }

  if (sortedEducation.length === 0) {
    return null;
  }

  return (
    <section id="education" className="space-y-8 py-4">
      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Education
        </h2>
        <p className="text-sm md:text-base text-base-content/70">
          Academic background and professional certifications
        </p>
      </motion.div>

      {/* Vertical Timeline: line + icon on left, card on right */}
      <div className="relative max-w-3xl mx-auto pl-8 md:pl-12">
        {/* Vertical line */}
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-primary/30 rounded-full md:left-6" />

        <ul className="space-y-8">
          {sortedEducation.map((item, index) => {
            const Icon = getEducationIcon(item);
            const fromLeft = index % 2 === 0;

            return (
              <motion.li
                key={`${item.institution}-${item.duration}`}
                className="relative flex gap-4 md:gap-6"
                initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Timeline icon circle */}
                <div className="absolute left-0 top-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-base-100 bg-primary text-primary-content shadow-lg md:h-12 md:w-12 md:left-1">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                {/* Card */}
                <div className="min-w-0 flex-1 rounded-2xl border border-base-300/60 bg-base-200/50 p-5 shadow-lg backdrop-blur-md ml-2 md:ml-4">
                  <h3 className="text-xl font-bold text-primary">
                    {item.degree}
                  </h3>
                  <p className="text-lg font-semibold text-base-content mt-1">
                    {item.institution}
                  </p>
                  {item.duration && (
                    <span className="badge badge-outline mt-2">
                      {item.duration}
                    </span>
                  )}
                  {item.description && (
                    <p className="text-sm text-base-content/80 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Education;
