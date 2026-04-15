import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Scissors, Sparkles, Droplets, Palette, Wind, Flower2,
  Award, CheckCircle2, ShieldCheck, HeartHandshake,
  Instagram, Facebook, MessageCircle, MapPin, Phone, Clock,
  Menu, X, ArrowRight, Star
} from 'lucide-react';

// --- Components ---

interface Service {
  icon: React.ElementType;
  title: string;
  desc: string;
  details: string[];
}

const services: Service[] = [
  { 
    icon: Scissors, 
    title: "Hair Couture", 
    desc: "Bespoke cuts, editorial color, and restorative treatments designed for your unique hair journey.",
    details: ["Precision Haircuts", "Balayage & Highlights", "Keratin Smoothing", "Scalp Detox Treatments"]
  },
  { 
    icon: Sparkles, 
    title: "Bridal Artistry", 
    desc: "Timeless makeup looks that capture your essence on your most significant day.",
    details: ["Airbrush Bridal Makeup", "Traditional Bridal Styling", "Engagement & Party Looks", "Bridal Trials"]
  },
  { 
    icon: Droplets, 
    title: "Skin Therapy", 
    desc: "Advanced facials and glow packages that reveal your most radiant, healthy complexion.",
    details: ["HydraFacial MD", "Diamond Microdermabrasion", "Organic Glow Facials", "Anti-Aging Treatments"]
  },
  { 
    icon: Palette, 
    title: "Nail Boutique", 
    desc: "Exquisite manicures and nail art that serve as the perfect finishing touch to your style.",
    details: ["Gel Extensions", "Luxury Pedicures", "Custom Nail Art", "Paraffin Wax Treatments"]
  },
  { 
    icon: Wind, 
    title: "Precision Grooming", 
    desc: "Gentle threading and waxing services delivered with meticulous attention to detail.",
    details: ["Organic Face Threading", "Full Body Waxing", "Brow Mapping & Shaping", "Tinting Services"]
  },
  { 
    icon: Flower2, 
    title: "Hair Rituals", 
    desc: "Deeply nourishing hair spa treatments that provide a sanctuary for your scalp and soul.",
    details: ["Ayurvedic Hair Spa", "Deep Conditioning Masks", "Anti-Hairfall Rituals", "Relaxing Head Massage"]
  },
];

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, letterSpacing: '0.1em' }}
      whileInView={{ opacity: 0.6, letterSpacing: '0.3em' }}
      viewport={{ once: true }}
      className="text-xs uppercase font-medium text-rose-gold mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-4xl md:text-6xl font-playfair font-bold text-charcoal"
    >
      {title}
    </motion.h2>
  </div>
);

const CustomButton = ({ children, variant = 'primary', href = '#', className = '', onClick }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'ghost', href?: string, className?: string, onClick?: () => void }) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 overflow-hidden group";
  const variants = {
    primary: "bg-rose-gold text-white hover:shadow-[0_10px_30px_rgba(183,110,121,0.3)]",
    secondary: "bg-charcoal text-white hover:shadow-[0_10px_30px_rgba(28,28,28,0.2)]",
    ghost: "border border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
  };

  return (
    <motion.a 
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      )}
    </motion.a>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-ivory selection:bg-rose-gold selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-rose-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center text-warm-ivory"
          >
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '1em' }}
              className="text-4xl md:text-6xl font-playfair font-bold mb-4"
            >
              EMBELLISH
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              className="h-px bg-rose-gold"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-warm-ivory/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-playfair text-3xl font-bold text-charcoal tracking-tighter"
          >
            EMBELLISH
          </motion.a>
          
          <div className="hidden md:flex items-center space-x-12">
            {['Home', 'Services', 'Gallery', 'Contact'].map((item, idx) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="text-sm uppercase tracking-widest font-medium text-charcoal hover:text-rose-gold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rose-gold transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-rose-gold transition-all duration-500"
            >
              Book Now
            </motion.a>
          </div>

          <button className="md:hidden text-charcoal" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-charcoal flex flex-col items-center justify-center"
            >
              <button 
                className="absolute top-8 right-8 text-white" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={40} />
              </button>
              <div className="flex flex-col items-center space-y-8">
                {['Home', 'Services', 'Gallery', 'Contact'].map((item, idx) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx + 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-playfair font-bold text-white hover:text-rose-gold transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.a 
                  href="#contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-rose-gold text-white px-12 py-4 rounded-full text-xl font-bold"
                >
                  Book Now
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="md:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-rose-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Luxury Beauty Experience</span>
              <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-playfair font-bold text-charcoal leading-[0.9] mb-8">
                Where Every <br />
                <span className="italic text-rose-gold font-normal">Woman</span> Leaves <br />
                Beautiful.
              </h1>
              <p className="text-xl md:text-2xl text-charcoal/70 font-cormorant italic max-w-lg mb-12">
                Elevating your natural beauty with premium services in Lahore. Hair, skin, and nails — redefined with elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <CustomButton href="#contact">Book Appointment</CustomButton>
                <CustomButton variant="ghost" href="https://wa.me/923000000000">WhatsApp Us</CustomButton>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-[10rem] overflow-hidden border-[12px] border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
                alt="Salon Interior" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 border border-rose-gold/30 rounded-full flex items-center justify-center hidden lg:flex"
            >
              <div className="w-32 h-32 border border-rose-gold/20 rounded-full"></div>
              <span className="absolute text-[10px] uppercase tracking-[0.3em] text-rose-gold font-bold">Premium • Service • Quality •</span>
            </motion.div>

            {/* Floating Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -right-6 top-1/4 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-rose-gold/10 max-w-[200px] hidden xl:block"
            >
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-brushed-gold fill-brushed-gold" />)}
              </div>
              <p className="text-sm font-cormorant italic text-charcoal mb-2">"The best bridal experience in Lahore. Truly magical."</p>
              <span className="text-[10px] uppercase tracking-widest font-bold text-rose-gold">— Maria K.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Our Curated Services" 
            subtitle="The Art of Beauty"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative p-8 lg:p-10 rounded-3xl bg-warm-ivory/30 hover:bg-white border border-transparent hover:border-rose-gold/20 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-rose-gold group-hover:text-white transition-all duration-500">
                  <service.icon className="w-8 h-8" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-charcoal mb-4">{service.title}</h3>
                <p className="text-charcoal/60 leading-relaxed mb-6">{service.desc}</p>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center text-rose-gold font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300"
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Split Layout */}
      <section className="py-32 bg-charcoal text-warm-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <SectionHeading 
                title="Why Embellish?" 
                subtitle="The Standard of Excellence"
              />
              <div className="space-y-12">
                {[
                  { icon: Award, title: "5+ Years of Mastery", desc: "A legacy of beauty and trust established since 2019." },
                  { icon: CheckCircle2, title: "Artisan Beauticians", desc: "Our staff is trained in international techniques and trends." },
                  { icon: ShieldCheck, title: "Uncompromising Hygiene", desc: "Medical-grade sterilization for your absolute peace of mind." },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * idx }}
                    className="flex items-start space-x-6"
                  >
                    <div className="w-12 h-12 rounded-full border border-rose-gold/30 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-rose-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-playfair font-bold mb-2">{item.title}</h4>
                      <p className="text-warm-ivory/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[5rem] overflow-hidden border-2 border-rose-gold/20 p-4">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1787&auto=format&fit=crop" 
                alt="Professional Service" 
                className="w-full h-full object-cover rounded-[4rem]"
              />
            </div>
            {/* Floating stat card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl text-charcoal"
            >
              <div className="text-4xl font-playfair font-bold text-rose-gold mb-1">10k+</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">Happy Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery - Masonry */}
      <section id="gallery" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Our Signature Work" 
            subtitle="Visual Poetry"
            centered
          />

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              { h: 'h-[400px]', label: 'Bridal Glow' },
              { h: 'h-[600px]', label: 'Hair Couture' },
              { h: 'h-[350px]', label: 'Nail Artistry' },
              { h: 'h-[500px]', label: 'Skin Revival' },
              { h: 'h-[450px]', label: 'Evening Glam' },
              { h: 'h-[550px]', label: 'Salon Interior' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative group overflow-hidden rounded-[2rem] bg-warm-ivory ${item.h} cursor-pointer`}
              >
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-white font-playfair text-3xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.label}</span>
                  <div className="w-12 h-px bg-rose-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
                {/* Placeholder for real images */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-white">Signature</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Editorial Style */}
      <section className="py-32 bg-warm-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading 
            title="Voices of Elegance" 
            subtitle="Client Testimonials"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Ayesha R.", text: "Embellish isn't just a salon; it's a sanctuary. The attention to detail in their hair couture is unparalleled in Lahore." },
              { name: "Sana M.", text: "My bridal look was exactly what I dreamed of — sophisticated, radiant, and timeless. I felt like a queen." },
              { name: "Fatima K.", text: "The skin therapy here is transformative. I've never felt more confident in my own skin. Truly a premium experience." },
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative group"
              >
                <div className="bg-white p-12 rounded-[3rem] shadow-xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-rose-gold/10 transition-colors"></div>
                  <div className="flex mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 text-brushed-gold fill-brushed-gold" />
                    ))}
                  </div>
                  <p className="text-2xl font-cormorant italic text-charcoal/80 leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center font-playfair font-bold text-rose-gold">
                      {testimonial.name[0]}
                    </div>
                    <span className="font-bold text-charcoal tracking-widest text-sm uppercase">{testimonial.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-24 border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-playfair font-bold text-white mb-8"
                >
                  Your Journey to <br />
                  <span className="italic text-rose-gold">Radiance</span> Starts Here.
                </motion.h2>
                <p className="text-xl text-white/70 mb-12 max-w-md">
                  Experience the pinnacle of beauty and relaxation. Our doors are open for your transformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <CustomButton className="!bg-white !text-charcoal hover:!bg-rose-gold hover:!text-white">Book Now</CustomButton>
                  <CustomButton variant="ghost" className="!border-white !text-white hover:!bg-white hover:!text-charcoal">WhatsApp Us</CustomButton>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-white">
                <div>
                  <h4 className="text-rose-gold uppercase tracking-widest text-xs font-bold mb-4">Location</h4>
                  <p className="text-lg opacity-80">123 Beauty Lane, Gulberg III<br />Lahore, Pakistan</p>
                </div>
                <div>
                  <h4 className="text-rose-gold uppercase tracking-widest text-xs font-bold mb-4">Contact</h4>
                  <p className="text-lg opacity-80">+92 300 0000000<br />hello@embellish.pk</p>
                </div>
                <div>
                  <h4 className="text-rose-gold uppercase tracking-widest text-xs font-bold mb-4">Hours</h4>
                  <p className="text-lg opacity-80">Mon–Sat: 10am – 8pm<br />Sun: 11am – 6pm</p>
                </div>
                <div>
                  <h4 className="text-rose-gold uppercase tracking-widest text-xs font-bold mb-4">Social</h4>
                  <div className="flex space-x-4 mt-2">
                    <Instagram className="w-6 h-6 hover:text-rose-gold cursor-pointer transition-colors" />
                    <Facebook className="w-6 h-6 hover:text-rose-gold cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-warm-ivory py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-playfair text-2xl font-bold tracking-tighter">EMBELLISH</div>
          <div className="text-sm uppercase tracking-[0.3em] opacity-40">
            © 2025 Embellish Beauty Salon. All rights reserved.
          </div>
          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold opacity-60">
            <a href="#" className="hover:text-rose-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-rose-gold transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.a 
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-[60] w-16 h-16 bg-rose-gold text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white" />
      </motion.a>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-charcoal/40 hover:text-charcoal transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="p-12">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-rose-gold/10 flex items-center justify-center text-rose-gold">
                    <selectedService.icon size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-playfair font-bold text-charcoal">{selectedService.title}</h3>
                    <span className="text-rose-gold uppercase tracking-widest text-xs font-bold">Premium Service</span>
                  </div>
                </div>
                
                <p className="text-xl text-charcoal/70 font-cormorant italic mb-8 leading-relaxed">
                  {selectedService.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {selectedService.details.map((detail, i) => (
                    <div key={i} className="flex items-center space-x-3 text-charcoal/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
                      <span className="text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <CustomButton className="w-full" href="#contact" onClick={() => setSelectedService(null)}>Book This Service</CustomButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
