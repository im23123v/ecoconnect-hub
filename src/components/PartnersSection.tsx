import { motion } from "framer-motion";
import { Building2, Leaf, Truck, Award, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

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
  { value: "98%", label: "Waste Diverted from Landfills" },
  { value: "₹2Cr+", label: "Value Generated for Partners" },
  { value: "50+", label: "Cities Covered" },
  { value: "15K", label: "Tons Processed Monthly" },
];

export const PartnersSection = () => {
  return (
    <section id="partners" className="py-24 bg-eco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                <partner.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-hero rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to make a difference?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of businesses transforming waste into opportunity. Get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Register Your Business
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};