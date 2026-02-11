import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useFetchData } from '../hooks/useFetchData.js';

const QUICK_LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'About', to: '/#about' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Projects', to: '/#projects' },
];

const TAGLINE = 'Building functional, user-centric MERN applications.';

const Footer = () => {
  const { data, loading, error } = useFetchData('personalInfo.json');

  const name = data?.personalInfo?.name ?? 'Md Ziaul Haque Arafat';
  const location = data?.personalInfo?.location ?? 'Chittagong, Bangladesh';
  const email = data?.contact?.email ?? 'mdarafat3167@gmail.com';
  const phone = data?.contact?.phone ?? '';
  const github = data?.socialLinks?.github ?? '';
  const linkedin = data?.socialLinks?.linkedin ?? '';

  return (
    <footer id="contact" className="bg-base-300 border-t border-base-content/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="grid gap-10 md:grid-cols-3 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Column 1: Logo & Branding */}
          <div className="space-y-2">
            <Link
              to="/#home"
              className="text-xl font-bold text-base-content hover:text-primary transition-colors"
            >
              {name}
            </Link>
            <p className="text-sm text-base-content/70 max-w-xs">
              {TAGLINE}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <FaEnvelope className="h-4 w-4 shrink-0" />
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <FaPhone className="h-4 w-4 shrink-0" />
                    {phone}
                  </a>
                </li>
              )}
              <li>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="h-4 w-4 shrink-0" />
                  {location}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-base-content/70 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-base-content/70 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          )}
        </motion.div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-base-content/10">
          <p className="text-center text-xs text-base-content/60">
            © 2026 Md Ziaul Haque Arafat. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
