import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

