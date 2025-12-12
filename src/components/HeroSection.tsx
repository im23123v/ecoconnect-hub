import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Recycle, MapPin, Users, Sparkles, Package, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";

// Optimized counter animation hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(eased * end);
      setCount(countRef.current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, start]);
  
  return count;
};

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const locations = useCountUp(150, 2000, isVisible);
  const recycled = useCountUp(5000, 2500, isVisible);
  const partners = useCountUp(200, 2000, isVisible);
  const livesSaved = useCountUp(1250, 2000, isVisible);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Optimized Background - using CSS transforms */}
      <div className="absolute inset-0 -z-10 will-change-transform">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/8 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/8 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-sand border border-eco-sage/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">St. Peter's Engineering College Hackathon • Team BitwiseBinary</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Connect Waste to </span>
            <span className="text-gradient">Purpose</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Bridging demolition sites, coconut vendors, and waste producers with recycling companies. 
            Now with blood donation network - save lives while saving the planet.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/locations-map">
              <Button variant="hero" size="xl" className="group">
                Explore Locations
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/track-request">
              <Button variant="ghost" size="xl" className="group">
                <Package className="w-5 h-5 mr-2" />
                Track Request
              </Button>
            </Link>
          </motion.div>

          {/* Stats - with animated counters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: MapPin, value: locations, suffix: "+", label: "Collection Points" },
              { icon: Recycle, value: recycled, suffix: "+", label: "Tons Recycled" },
              { icon: Heart, value: livesSaved, suffix: "+", label: "Lives Saved" },
              { icon: Users, value: partners, suffix: "+", label: "Active Partners" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-card shadow-card border border-border hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-eco-sand flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};