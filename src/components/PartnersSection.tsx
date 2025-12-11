import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Leaf, Truck, Award, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Construction Companies",
    description: "Source recycled materials for your projects at competitive prices while meeting sustainability goals.",
    benefits: ["Cost-effective materials", "Green certifications", "Reliable supply chain"],
  },
  {
    icon: Leaf,
    title: "Recycling Startups",
    description: "Access a steady stream of sorted waste materials to fuel your innovative recycling processes.",
    benefits: ["Consistent supply", "Pre-sorted materials", "Direct partnerships"],
  },
  {
    icon: Truck,
    title: "Logistics Partners",
    description: "Join our network of eco-friendly transport providers connecting waste sources to recyclers.",
    benefits: ["Optimized routes", "Volume contracts", "Green fleet support"],
  },
];

const stats = [
  { value: 98, suffix: "%", label: "Waste Diverted from Landfills" },
  { value: 2, prefix: "₹", suffix: "Cr+", label: "Value Generated for Partners" },
  { value: 50, suffix: "+", label: "Cities Covered" },
  { value: 15, suffix: "K", label: "Tons Processed Monthly" },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, start]);
  return count;
};

export const PartnersSection = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animatedStats = stats.map(stat => ({
    ...stat,
    animatedValue: useCountUp(stat.value, 2000, statsVisible)
  }));

  return (
    <section id="partners" className="py-24 bg-eco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Partner With <span className="text-gradient">EcoConnect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you produce waste or need recycled materials, become part of the circular economy.
          </p>
        </motion.div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-30px" }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-all duration-200 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <partner.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {partner.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {partner.description}
              </p>
              <ul className="space-y-2">
                {partner.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-hero rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {animatedStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1 tabular-nums">
                  {stat.prefix}{stat.animatedValue}{stat.suffix}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: TrendingUp, title: "Growth", desc: "Scale your sustainability efforts" },
            { icon: Shield, title: "Trust", desc: "Verified and compliant partners" },
            { icon: Zap, title: "Speed", desc: "Quick onboarding process" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to make a difference?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of businesses transforming waste into opportunity. Get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/join-network">
              <Button variant="hero" size="xl" className="group">
                Register Your Business
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};