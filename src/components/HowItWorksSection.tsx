import { motion } from "framer-motion";
import { MapPin, Truck, Factory, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Locate Collection Point",
    description: "Find the nearest waste collection point using our interactive map. Filter by waste type to find exactly what you need.",
    color: "bg-eco-leaf",
  },
  {
    icon: Truck,
    title: "Schedule Pickup",
    description: "Request a pickup or drop off your materials at the location. Our network ensures efficient waste transportation.",
    color: "bg-eco-moss",
  },
  {
    icon: Factory,
    title: "Processing & Recycling",
    description: "Materials are sorted and sent to specialized recycling partners who transform waste into valuable resources.",
    color: "bg-eco-forest",
  },
  {
    icon: Sparkles,
    title: "New Life for Materials",
    description: "Recycled materials become raw inputs for new construction, products, and sustainable innovations.",
    color: "bg-accent",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and efficient waste management that benefits everyone in the ecosystem.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - optimized with CSS */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-eco-leaf via-eco-forest to-accent opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-30px" }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="lg:absolute lg:-top-3 lg:left-1/2 lg:-translate-x-1/2 mb-4 lg:mb-0">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-primary-foreground font-bold text-lg shadow-card relative z-10 transition-transform duration-200 group-hover:scale-110`}>
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="lg:pt-16 text-center lg:text-left">
                  <div className="inline-flex lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-eco-sand mb-4 transition-all duration-200 group-hover:shadow-soft group-hover:bg-primary/10">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {["Real-time tracking", "Verified partners", "Eco-friendly process", "24/7 support"].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              {feature}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};