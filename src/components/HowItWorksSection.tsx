import { motion } from "framer-motion";
import { MapPin, Truck, Factory, Sparkles } from "lucide-react";

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
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-eco-leaf via-eco-forest to-accent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="lg:absolute lg:-top-3 lg:left-1/2 lg:-translate-x-1/2 mb-4 lg:mb-0">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-primary-foreground font-bold text-lg shadow-card relative z-10`}>
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="lg:pt-16 text-center lg:text-left">
                  <div className="inline-flex lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-eco-sand mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
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
      </div>
    </section>
  );
};