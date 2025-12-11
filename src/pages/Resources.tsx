import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink,
  Download,
  Lightbulb,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const guides = [
  {
    title: "Getting Started with Waste Segregation",
    description: "Learn the basics of separating different types of waste for effective recycling.",
    icon: BookOpen,
    category: "Beginner"
  },
  {
    title: "Setting Up a Collection Point",
    description: "Step-by-step guide to establishing a waste collection location in your area.",
    icon: FileText,
    category: "Advanced"
  },
  {
    title: "E-Waste Disposal Best Practices",
    description: "Safe handling and disposal methods for electronic waste materials.",
    icon: Video,
    category: "Intermediate"
  },
  {
    title: "Composting Food Waste at Home",
    description: "Turn your kitchen scraps into nutrient-rich compost for your garden.",
    icon: Lightbulb,
    category: "Beginner"
  },
  {
    title: "Textile Recycling Guide",
    description: "How to properly donate, recycle, or upcycle old clothes and fabrics.",
    icon: BookOpen,
    category: "Intermediate"
  },
  {
    title: "Construction Waste Management",
    description: "Guidelines for managing demolition and construction site waste responsibly.",
    icon: FileText,
    category: "Advanced"
  }
];

const faqs = [
  {
    question: "What types of waste can I bring to collection points?",
    answer: "Our collection points accept five main categories: Demolition waste (bricks, concrete, metal), Coconut waste (shells, husks, coir), E-waste (electronics, batteries), Textile waste (clothes, fabrics), and Food waste (organic matter). Each location specializes in specific categories, so check the location details before visiting."
  },
  {
    question: "How do I add my business as a collection point?",
    answer: "You can join our network by clicking the 'Join Network' button and filling out the form with your location details, contact information, and the types of materials you can accept. Our team will review your submission and add your location to the platform."
  },
  {
    question: "Is there a cost to use EcoConnect?",
    answer: "EcoConnect is completely free for individuals looking to recycle their waste. For businesses joining as collection points, there are no fees - we aim to make sustainable waste management accessible to everyone."
  },
  {
    question: "How do I schedule a pickup?",
    answer: "Visit the location detail page for your nearest collection point and click 'Schedule Pickup'. You can then choose from available time slots based on the location's pickup schedule. Some locations also offer on-demand pickups for larger quantities."
  },
  {
    question: "What happens to the waste after collection?",
    answer: "Collected materials are sent to appropriate recycling facilities or processing centers. Demolition waste is repurposed for new construction, e-waste is safely dismantled for component recovery, textiles are upcycled or donated, and food waste is composted or converted to biogas."
  },
  {
    question: "How can I track my environmental impact?",
    answer: "Visit our Impact page to see real-time statistics on the network's collective environmental impact. We're working on individual impact tracking features that will be available soon."
  }
];

const tips = [
  "Clean and dry recyclables before dropping them off to improve recycling quality.",
  "Remove batteries from electronics before disposing of e-waste.",
  "Separate different types of materials at home to save time at collection points.",
  "Check operating hours before visiting a collection point.",
  "For large quantities, call ahead to ensure the location can accommodate your waste.",
  "Consider carpooling when visiting collection points to reduce your carbon footprint."
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Learn & Grow</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient">Resources</span> & Guides
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to know about sustainable waste management, 
              recycling best practices, and making an environmental impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8"
          >
            Guides & Tutorials
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Read More
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8" />
              <h2 className="text-2xl md:text-3xl font-bold">Quick Tips for Recyclers</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-primary-foreground/10 rounded-xl p-4"
                >
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-primary-foreground/90">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Got Questions?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Downloadable Resources
            </h2>
            <p className="text-muted-foreground">
              Printable guides and checklists for easy reference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Waste Segregation Poster", type: "PDF", size: "2.4 MB" },
              { title: "Recycling Checklist", type: "PDF", size: "1.1 MB" },
              { title: "Collection Point Setup Guide", type: "PDF", size: "3.8 MB" }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.type} • {resource.size}</p>
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Download className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Start your sustainable journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/locations-map">
                <Button variant="hero" size="lg">
                  Find Collection Points
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/join-network">
                <Button variant="outline" size="lg">
                  Join Our Network
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
