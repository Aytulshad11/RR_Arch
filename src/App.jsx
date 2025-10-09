// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { Helmet } from 'react-helmet'
// import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'
// import HomePage from './pages/HomePage'
// import PropertiesPage from './pages/PropertiesPage'
// import PropertyDetailPage from './pages/PropertyDetailPage'
// import AboutPage from './pages/AboutPage'
// import ContactPage from './pages/ContactPage'
// import FloatingButtons from './components/ui/FloatingButtons'
// import InteriorEstimatorWizard from "./pages/InteriorEstimatorWizard";
// import KitchenEstimatorWizard from "./pages/KitchenEstimatorWizard";

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Helmet>
//           <title>Dream Home Builders | Build Your Dream Home</title>
//           <meta name="description" content="Dream Home Builders offers premium house plans, elevations, and interior designs. Find your perfect home design." />
//         </Helmet>
        
//         <Navbar />
        
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/plans" element={<PropertiesPage category="plans" />} />
//             <Route path="/elevations" element={<PropertiesPage category="elevations" />} />
//             <Route path="/interiors" element={<PropertiesPage category="interiors" />} />
//             <Route path="/property/:id" element={<PropertyDetailPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/kitchen" element={<KitchenEstimatorWizard />} />
//             <Route path="/home" element={<InteriorEstimatorWizard />} />
//           </Routes>
//         </main>
        
//         <Footer />
//         <FloatingButtons />
//       </div>
//     </Router>
//   )
// }

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import { motion,  AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FaPhone, FaWhatsapp,FaQuoteLeft , FaStar , FaMapMarkerAlt, FaEnvelope, FaFacebook, FaTwitter, FaChevronLeft, FaInstagram, FaLinkedin, FaBars, FaTimes, FaRulerCombined, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

import Logo from '../src/assets/Logo_1.png'; // Ensure you have a logo image in the specified path
// Custom Cursor Component
// const CustomCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleMouseOver = (e) => {
//       // Check if hovering over any element that should trigger the cursor change
//       if (e.target.closest('a, button, .cursor-hover, [data-cursor-hover="true"]')) {
//         setIsHovering(true);
//       } else {
//         setIsHovering(false);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseover', handleMouseOver);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, []);

//   return (
//     <motion.div
//       className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-900 pointer-events-none z-[9999] mix-blend-difference"
//       animate={{
//         x: position.x - 12,
//         y: position.y - 12,
//         scale: isHovering ? 2 : 1,
//         // Enlarge and change color on hover (using a subtle yellow/gold for the change)
//         backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.3)' : 'transparent', 
//         borderColor: isHovering ? 'transparent' : '#1e3a8a' // Royal Navy Blue
//       }}
//       transition={{ type: 'spring', stiffness: 500, damping: 28 }}
//     />
//   );
// };

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Define the non-animatable "transparent" value as transparent black RGBA
  const TRANSPARENT_RGBA = 'rgba(0, 0, 0, 0)'; 

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over any element that should trigger the cursor change
      if (e.target.closest('a, button, .cursor-hover, [data-cursor-hover="true"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-900 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 2 : 1,
        // FIXED: Use RGBA for animation start/end points
        backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.3)' : TRANSPARENT_RGBA, 
        borderColor: isHovering ? TRANSPARENT_RGBA : '#1e3a8a' // Royal Navy Blue
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
   // New (Specific)
{ name: 'Plans', href: '#services?tab=Plans' },
{ name: 'Elevation', href: '#services?tab=Elevation' },
{ name: 'Interior', href: '#services?tab=Interior' },
    { name: 'About Us', href: '#why-choose-us' },
    { name: 'Contact Us', href: '#footer' }
  ];

    const scrollToSection = (e, href) => {
  e.preventDefault();

  // Check if the link targets the services section with a tab
  if (href.startsWith('#services?tab=')) {
    const tabName = href.split('tab=')[1];

    // 🔥 Immediately update the ServicesSection active tab (no delay)
    const event = new CustomEvent('updateServiceTab', { detail: tabName });
    window.dispatchEvent(event);

    // Update hash so refresh / share still works
    window.location.hash = `services?tab=${tabName}`;

    // Adjust href to scroll to the section
    href = '#services';
  }

  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    setIsOpen(false);
  }
};


  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        // Sticky header with slight background blur on scroll
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-16 flex justify-between items-center">
         <div className="w-40 h-8 flex"> {/* Set a fixed size for the logo container (adjust w-40 and h-8 as needed) */}
          <a href="#home" className="w-full h-full" data-cursor-hover="true">
            <img 
              src={Logo} // 
              alt="RR Architechts"
              className="w-full h-full object-contain" // Ensures image fills the container size
            />
          </a>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-yellow-400'
              } group`}
              data-cursor-hover="true" // Custom attribute for cursor
            >
              {link.name}
              {/* Hover underline animation on menu links */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl"
          data-cursor-hover="true"
        >
          {isOpen ? (
            <FaTimes className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <FaBars className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-white shadow-lg"
      >
        <div className="flex flex-col space-y-4 p-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-gray-800 hover:text-blue-900 font-medium transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
};

// Hero Section
const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
   const images = [
    'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5s slide
    return () => clearInterval(interval);
  }, []);

  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true }); // For text fade-up on scroll (though mainly for initial load here)

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Slideshow (Banner images fade + slide transition) */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: index === currentImage ? 1 : 0,
            scale: index === currentImage ? 1 : 1.1 // Subtle slide effect
          }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* Deeper navy blue overlay */}
          <div className="absolute inset-0" /> 
        </motion.div>
      ))}

      {/* Content */}
      <div ref={contentRef} className="container mx-auto px-4 lg:px-16 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Build Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
            Premium house designs, elevations, and interior planning services customized for your specific needs.
          </p>
          <motion.a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(212, 175, 55, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-yellow-500 text-blue-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all"
            data-cursor-hover="true"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Buttons (Phone and WhatsApp with hover animations) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
        className="fixed right-6 bottom-24 z-40 flex flex-col gap-4"
      >
        <motion.a
          href="tel:+918989119503"
          whileHover={{ scale: 1.1, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
          data-cursor-hover="true"
        >
          <FaPhone size={24} />
        </motion.a>
        <motion.a
          href="https://wa.me/+918989119503"
          whileHover={{ scale: 1.1, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
          data-cursor-hover="true"
        >
          <FaWhatsapp size={26} />
        </motion.a>
      </motion.div>
    </section>
  );
};

// Services Section
// const ServicesSection = () => {
//   const [activeService, setActiveService] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });
//   const scrollRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: scrollRef });

//   // Simplified Parallax-like effect on the image container (vertical shift)
//   const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

//  const services = [
//   {
//     name: 'Plans',
//     images: [
//       'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/7269150/pexels-photo-7269150.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     description: 'Detailed 2D floor plans and layout drawings for construction permits and efficient space utilization.'
//   },
//   {
//     name: 'Elevation',
//     images: [
//       'https://images.pexels.com/photos/258163/pexels-photo-258163.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2080962/pexels-photo-2080962.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     description: 'Stunning 3D exterior views (front, rear, side) showing materials, finishes, and architectural details.'
//   },
//   {
//     name: 'Interior',
//     images: [
//       'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/6322046/pexels-photo-6322046.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     description: 'Complete interior design, including furniture layout, material selection, lighting, and 3D rendering.'
//   },
//   {
//     name: 'Landscape',
//     images: [
//       'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1393649/pexels-photo-1393649.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     description: 'Creative and functional outdoor space design, including gardens, patios, and pool areas.'
//   }
// ];
  
//   // Carousel logic: cycle through images for the active service
//   const [currentServiceImage, setCurrentServiceImage] = useState(0);

//   useEffect(() => {
//     setCurrentServiceImage(0); // Reset image index when service changes
//     const interval = setInterval(() => {
//         setCurrentServiceImage(prev => (prev + 1) % services[activeService].images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [activeService, services]);


//   return (
//     <section id="services" ref={ref} className="py-24 bg-white">
//       <div className="container mx-auto px-4 lg:px-16">
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={isInView ? { y: 0, opacity: 1 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Explore Our Comprehensive Services</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             From foundation plans to final interior details, we cover every step of your home building journey.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Service List (Left Column) */}
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={isInView ? { x: 0, opacity: 1 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="space-y-4 lg:sticky lg:top-24"
//           >
//             {services.map((service, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setActiveService(index)}
//                 whileHover={{ x: 5 }} // Subtle horizontal shift on hover
//                 className={`w-full text-left p-6 rounded-xl transition-all flex justify-between items-center ${
//                   activeService === index
//                     ? 'bg-blue-900 text-white shadow-xl transform scale-[1.01]'
//                     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                 }`}
//                 data-cursor-hover="true"
//               >
//                 <div>
//                     <h3 className="text-2xl font-semibold mb-1">{service.name}</h3>
//                     <p className={`text-sm ${activeService === index ? 'text-gray-200' : 'text-gray-500'}`}>{service.description}</p>
//                 </div>
//                 <FaChevronRight className="text-2xl opacity-50" />
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Image Carousel (Right Column) */}
//           <div ref={scrollRef}>
//             <motion.div
//                 initial={{ x: 50, opacity: 0 }}
//                 animate={isInView ? { x: 0, opacity: 1 } : {}}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
//                 style={{ y: y }} // Parallax effect
//             >
//                 {services[activeService].images.map((img, idx) => (
//                     <motion.div
//                         key={idx}
//                         // Image carousel that updates based on selected service (click service → load images with fade animation)
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: idx === currentServiceImage ? 1 : 0 }}
//                         transition={{ duration: 1 }}
//                         className="absolute inset-0 bg-cover bg-center"
//                         style={{ backgroundImage: `url(${img})` }}
//                     />
//                 ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [currentServiceImage, setCurrentServiceImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 🆕 state for pause control

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // inside ServicesSection.jsx (top of file)
// const floorPlanImages = Object.values(import.meta.glob('../src/assets/aytul/floor-plans/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
// const elevationImages = Object.values(import.meta.glob('../src/assets/aytul/elevation/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
// const interiorImages = Object.values(import.meta.glob('../src/assets/aytul/interior/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));

  const floorPlanImages = Object.values(
  import.meta.glob('/src/assets/aytul/floor-plans/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
).map((path) => new URL(path, import.meta.url).href);

const elevationImages = Object.values(
  import.meta.glob('/src/assets/aytul/elevation/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
).map((path) => new URL(path, import.meta.url).href);

const interiorImages = Object.values(
  import.meta.glob('/src/assets/aytul/interior/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
).map((path) => new URL(path, import.meta.url).href);

  const landscapeImages = Object.values(
  import.meta.glob('/src/assets/aytul/landscape/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
).map((path) => new URL(path, import.meta.url).href);

  console.log('landsca Images:', landscapeImages);
 
  const services = [
  {
    name: "Plans",
    images: floorPlanImages,
    description:
      "Detailed 2D floor plans and layout drawings for construction permits and efficient space utilization.",
  },
  {
    name: "Elevation",
    images: elevationImages,
    description:
      "Stunning 3D exterior views (front, rear, side) showing materials, finishes, and architectural details.",
  },
  {
    name: "Interior",
    images: interiorImages,
    description:
      "Complete interior design, including furniture layout, material selection, lighting, and 3D rendering.",
  },
  {
    name: "Landscape",
    images: landscapeImages,
    description:
      "Creative and functional outdoor space design, including gardens, patios, and pool areas.",
  },
];


  // --- URL Sync ---
useEffect(() => {
  const handleTabUpdate = (event) => {
    const tabName = event.detail;
    const foundIndex = services.findIndex(
      (s) => s.name.toLowerCase() === tabName.toLowerCase()
    );
    if (foundIndex !== -1) {
      setActiveService(foundIndex);
    }
  };

  window.addEventListener('updateServiceTab', handleTabUpdate);
  return () => window.removeEventListener('updateServiceTab', handleTabUpdate);
}, [services]);

  // --- Manual Control Handlers ---
  const handleServiceClick = (index) => {
    setActiveService(index);
    setCurrentServiceImage(0);
    window.history.pushState(null, "", `#services?tab=${services[index].name}`);
  };

  const handlePrev = () => {
    setCurrentServiceImage(
      (prev) =>
        (prev - 1 + services[activeService].images.length) %
        services[activeService].images.length
    );
  };

  const handleNext = () => {
    setCurrentServiceImage(
      (prev) => (prev + 1) % services[activeService].images.length
    );
  };

  // --- Auto Slide (with pause) ---
  useEffect(() => {
    if (isPaused) return; // stop auto scroll when paused

    const interval = setInterval(() => {
      setCurrentServiceImage(
        (prev) => (prev + 1) % services[activeService].images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [activeService, isPaused]);

  // --- Swipe Handling ---
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) handleNext();
    else if (info.offset.x > swipeThreshold) handlePrev();
  };

  // --- Framer Motion Variants ---
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section id="services" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Explore Our Comprehensive Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From foundation plans to final interior details, we cover every step
            of your home building journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            {services.map((service, index) => (
              <motion.button
                key={index}
                onClick={() => handleServiceClick(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ x: 5 }}
                className={`w-full text-left p-4 md:p-6 rounded-xl transition-all flex justify-between items-center ${
                  activeService === index
                    ? "bg-blue-900 text-white shadow-xl transform scale-[1.01]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-1">
                    {service.name}
                  </h3>
                  <p
                    className={`text-xs md:text-sm ${
                      activeService === index
                        ? "text-gray-200"
                        : "text-gray-500"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
                <FaChevronRight className="text-2xl opacity-50" />
              </motion.button>
            ))}
          </motion.div>

          {/* RIGHT COLUMN */}
          <div ref={scrollRef} className="relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setIsPaused(true)}  // 🆕 pause on hover image
              onMouseLeave={() => setIsPaused(false)} // 🆕 resume on leave
              className="relative h-[350px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl z-0 bg-gray-200"
              style={{ y }}
            >
             <AnimatePresence initial={false} custom={currentServiceImage}>
  <motion.div
    key={`${activeService}-${currentServiceImage}`} // ✅ unique per service
    custom={1}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    }}
    className="absolute inset-0 bg-contain bg-center bg-no-repeat pointer-events-none"
   style={{
  backgroundImage: `url("${services[activeService].images[currentServiceImage]}")`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#f3f4f6",
}}

  />
</AnimatePresence>

              {/* ARROWS */}
              <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
                <motion.button
                  onClick={handlePrev}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 md:p-4 bg-blue-900/50 hover:bg-blue-900/80 text-white rounded-full transition-all"
                >
                  <FaChevronLeft size={16} />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 md:p-4 bg-blue-900/50 hover:bg-blue-900/80 text-white rounded-full transition-all"
                >
                  <FaChevronRight size={16} />
                </motion.button>
              </div>

              {/* DOTS */}
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {services[activeService].images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentServiceImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentServiceImage
                        ? "bg-yellow-500 w-3 h-3"
                        : "bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Standard House Sizes Section
const HouseSizesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });


  const sizeImages = Object.values(
  import.meta.glob("../src/assets/aytul/sizes/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" })
);

  const sizes = [
    {
      size: '20x40',
      sqft: '800 sq ft',
      desc: 'Compact urban living',
      img: sizeImages[0]
    },
    {
      size: '30x60',
      sqft: '1800 sq ft',
      desc: 'Perfect family home',
      img: sizeImages[1]
    },
    {
      size: '40x80',
      sqft: '3200 sq ft',
      desc: 'Spacious luxury living',
      img: sizeImages[2]
    },
    {
      size: '60x90',
      sqft: '5400 sq ft',
      desc: 'Premium estate design',
      img: sizeImages[3]
    }
  ];

  return (
    <section id="house-sizes" ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Standard House Sizes</h2>
          <p className="text-xl text-gray-600">Pre-designed plans for popular plot dimensions</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sizes.map((item, index) => (
            <motion.div
              key={index}
              // Animation: cards fade up staggered when in viewport
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              // Hover effect: card scales slightly + shadow + dark overlay with text.
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(30, 58, 138, 0.2)' }} 
              className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-80"
              data-cursor-hover="true"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              {/* Dark overlay with text */}
              <div className="absolute inset-0 transition-all duration-300 " /> 
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="bg-yellow-500 text-blue-900 w-fit px-4 py-1 rounded-full font-bold mb-3 flex items-center gap-2 text-sm">
                  <FaRulerCombined /> {item.size}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.sqft}</h3>
                <p className="text-gray-100">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



//success stroies
const SuccessStories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);


  const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Delhi",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    text: "We are extremely satisfied with the house plan designed by DreamHome. The team understood our requirements perfectly and delivered a beautiful design that maximizes space utilization and natural light.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    avatar:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    text: "The elevation design for our bungalow was stunning! Everyone in our neighborhood asks about who designed our house. Thank you for making our dream home stand out.",
  },
  {
    id: 3,
    name: "Karthik Reddy",
    location: "Hyderabad",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    text: "Working with DreamHome was a breeze. Their interior design suggestions were practical and aesthetically pleasing. Our home feels more spacious and functional now.",
  },
  {
    id: 4,
    name: "Meera Patel",
    location: "Ahmedabad",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    text: "The 3D visualization of our house helped us make better decisions before construction. The final result matches exactly what was shown in the renders. Highly recommended!",
  },
];
  
  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Touch / swipe support ---
  const startX = useRef(0);
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  // Determine number of cards to show
  const isMobile = window.innerWidth < 768;
  const itemsToShow = isMobile ? 1 : 2;

  // Slice visible testimonials
  const visibleTestimonials = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleTestimonials.push(testimonials[(index + i) % testimonials.length]);
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience with us.
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handlePrev}
            className="bg-white shadow-md p-3 rounded-full text-blue-900 hover:bg-blue-100"
          >
            <FaChevronLeft size={18} />
          </motion.button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNext}
            className="bg-white shadow-md p-3 rounded-full text-blue-900 hover:bg-blue-100"
          >
            <FaChevronRight size={18} />
          </motion.button>
        </div>

        {/* Testimonials */}
        <div className="flex justify-center items-stretch gap-8 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={{
                  enter: (dir) => ({
                    x: dir > 0 ? 100 : -100,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir) => ({
                    x: dir > 0 ? -100 : 100,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="w-full md:w-[45%] bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col"
              >
                <FaQuoteLeft className="text-blue-600 text-3xl mb-4 opacity-80" />
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-200"
                  />
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


// Why Choose Us Section
const AnimatedNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/\D/g, ""), 10); // remove + sign etc
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = 30;
    let step = Math.ceil((end - start) / (totalMilSecDur / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}+
    </span>
  );
};

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax background effect
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const stats = [
    { number: "3500", label: "Plans Completed" },
    { number: "2500", label: "Elevations Designed" },
    { number: "2000", label: "Interiors Completed" },
    { number: "1500", label: "Bungalows Designed" },
    { number: "1300", label: "Commercial Projects" },
  ];

  const reasons = [
    "Expert architects with 15+ years of experience",
    "Customized designs tailored to your lifestyle",
    "3D visualization before construction begins",
    "Affordable pricing with transparent quotations",
    "Online drawings & on-site visit facility",
    "Vastu-compliant planning for peace and prosperity",
    "Detailed technical drawings that save time and cost",
    "End-to-end support from start to finish",
  ];

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        ref={scrollRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          y,
          backgroundImage:
            "url('https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg')",
          opacity: 0.1,
        }}
      ></motion.div>

      <div className="relative z-10 container mx-auto px-4 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Building trust through excellence and innovation
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center mb-16"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-blue-800">
                {isInView && <AnimatedNumber target={item.number} />}
              </div>
              <div className="text-sm md:text-base text-gray-600 mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reasons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-blue-900 text-center">
            Reasons to Choose Our Services
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="flex items-start gap-4 bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-300"
                data-cursor-hover="true"
              >
                <FaCheckCircle className="text-blue-700 text-2xl mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-gray-800 font-medium">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Footer Component
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' }); // Ensure it triggers when it enters the viewport

  return (
    <motion.footer
      id="footer"
      ref={ref}
      // Footer fades in from bottom when scrolled into view
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-blue-900 text-white py-16"
    >
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">

          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-extrabold tracking-wider mb-4">
              RR<span className="text-yellow-500">Architects</span>
            </h3>
            <p className="text-gray-300 mb-6 text-sm">
              Creating beautiful home designs tailored to your dreams and needs.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61581785843692 " className="text-gray-300 hover:text-yellow-500 transition" data-cursor-hover="true">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition" data-cursor-hover="true">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com/rranpindore4/" className="text-gray-300 hover:text-yellow-500 transition" data-cursor-hover="true">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition" data-cursor-hover="true">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
           {/* Navigation Links (Added for better structure) */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-yellow-500">Quick Links</h4>
            <ul className="space-y-2 text-sm">
                {['Home', 'Plans', 'Elevation', 'Interior', 'About Us'].map((link) => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase().replace(' ', '-')}`} 
                           className="text-gray-300 hover:text-white transition relative group"
                           data-cursor-hover="true"
                        >
                            {link}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
                        </a>
                    </li>
                ))}
            </ul>
          </div>


          {/* Contact Info (Center in original prompt, adjusted for grid) */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-yellow-500">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-500" />
                <a href="tel:+918989119503" className="text-gray-300 hover:text-white transition" data-cursor-hover="true">+91-8989119503
</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <a href="mailto:rranpindore@gmail.com" className="text-gray-300 hover:text-white transition" data-cursor-hover="true">rranpindore@gmail.com
</a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-yellow-500" />
                <a href="https://wa.me/+918989119503
" className="text-gray-300 hover:text-white transition" data-cursor-hover="true">WhatsApp: +918989119503</a>
              </div>
            </div>
          </div>

          {/* Address (Right in original prompt, adjusted for grid) */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-yellow-500">Our Location</h4>
            <div className="flex items-start gap-3 text-sm">
              <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                832, Old Loha Mandi ,<br />
                Opp. to Devshree Talkies,<br />
                Indore, Madhya Pradesh, India
              </p>

            </div>
          </div>
        </div>

        {/* Bottom row: copyright text + privacy policy/terms links */}
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} RR Architects. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition" data-cursor-hover="true">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition" data-cursor-hover="true">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="font-sans bg-white">
      <style>{`
        /* Disable native cursor when CustomCursor is present */
        * { cursor: none !important; } 
        body { overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        /* Optional: Hide scrollbars for cleaner look */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <CustomCursor />
      <Header />
      <HeroSection />
      <ServicesSection />
      <HouseSizesSection />
      <SuccessStories />
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
}