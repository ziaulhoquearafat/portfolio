import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { FaExternalLinkAlt, FaGithub, FaServer } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFetchData } from '../hooks/useFetchData.js';

gsap.registerPlugin(useGSAP);

const ProjectDetails = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const {
    data: projects,
    loading,
    error,
  } = useFetchData('projects.json');

  // GSAP page transition animation
  useGSAP(
    () => {
      if (!containerRef.current || loading) return;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
      })
        .from(
          contentRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.1,
          },
          '-=0.3',
        );
    },
    { scope: containerRef, dependencies: [loading] },
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto">
        <span>Failed to load project: {error.message}</span>
      </div>
    );
  }

  const project =
    Array.isArray(projects) &&
    projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <p className="text-lg font-semibold text-base-content">
          Project not found.
        </p>
        <Link to="/#projects" className="btn btn-outline btn-sm">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero Image */}
      {project.image && (
        <div ref={heroRef} className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-xl">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              {project.name}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={contentRef} className="space-y-8">
        {/* Description */}
        {project.longDescription && (
          <section className="card bg-base-100/80 border border-base-300/70 shadow-sm">
            <div className="card-body">
              <h2 className="text-xl font-semibold text-base-content mb-2">
                About This Project
              </h2>
              <p className="text-base text-base-content/80 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-base-content mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="badge badge-lg badge-primary border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary gap-2"
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}

          {project.githubClient && (
            <a
              href={project.githubClient}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline gap-2"
            >
              <FaGithub />
              Client Code
            </a>
          )}

          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline gap-2"
            >
              <FaServer />
              Server Code
            </a>
          )}
        </section>

        {/* Challenges Section */}
        {project.challenges && (
          <section className="card bg-base-200/60 border border-base-300/70 shadow-sm">
            <div className="card-body">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Challenges & Solutions
              </h2>
              <p className="text-base text-base-content/80 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          </section>
        )}

        {/* Improvements & Future Plans */}
        {(project.improvements || project.futurePlans) && (
          <section className="card bg-base-100/80 border border-base-300/70 shadow-sm">
            <div className="card-body space-y-4">
              {project.improvements && (
                <div>
                  <h2 className="text-xl font-semibold text-base-content mb-3">
                    Planned Improvements
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-base text-base-content/80">
                    {project.improvements
                      .split('.')
                      .filter((item) => item.trim())
                      .map((item, idx) => (
                        <li key={idx}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}

              {project.futurePlans && (
                <div>
                  <h2 className="text-xl font-semibold text-base-content mb-3">
                    Future Plans
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-base text-base-content/80">
                    {project.futurePlans
                      .split('.')
                      .filter((item) => item.trim())
                      .map((item, idx) => (
                        <li key={idx}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div>
          <Link to="/#projects" className="btn btn-ghost gap-2">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
