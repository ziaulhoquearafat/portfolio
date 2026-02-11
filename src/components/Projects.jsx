import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useFetchData } from '../hooks/useFetchData.js';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 * index,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const Projects = () => {
  const { data: projects, loading, error } = useFetchData('projects.json');

  if (loading) {
    return (
      <section id="projects" className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="flex justify-center py-16">
        <div className="alert alert-error max-w-md">
          <span>Failed to load projects: {error.message}</span>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="space-y-8 py-4">
      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Featured Projects
        </h2>
        <p className="text-sm md:text-base text-base-content/70">
          A showcase of my recent work building modern web applications
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="card bg-base-100/90 border border-base-300/70 overflow-hidden group"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              }}
            >
              {/* Project Image */}
              {project.image && (
                <figure className="relative h-48 overflow-hidden bg-base-200">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
                </figure>
              )}

              <div className="card-body gap-3 p-5">
                <h3 className="card-title text-lg text-base-content">
                  {project.name}
                </h3>

                {project.description && (
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack Badges */}
                {Array.isArray(project.techStack) &&
                  project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="badge badge-sm badge-outline border-primary/40 text-primary/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="badge badge-sm badge-outline border-base-content/30 text-base-content/60">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                <div className="card-actions justify-end mt-2">
                  <Link
                    to={`/project/${project.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View More
                  </Link>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-primary/5" />
            </motion.article>
          ))
        ) : (
          <p className="col-span-full text-center text-base-content/70">
            No projects found. Make sure `/public/data/projects.json` contains
            an array of project objects.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
