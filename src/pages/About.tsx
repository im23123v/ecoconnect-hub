import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Code2,
  Recycle,
  Globe,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Team BitwiseBinary",
    role: "Full Stack Development",
    avatar: "👨‍💻",
    description: "Passionate developers building sustainable solutions"
  }
];

const milestones = [
  { year: "2024", event: "Project Inception at St. Peter's Engineering College Hackathon" },
  { year: "2024", event: "Platform Development & Database Integration" },
  { year: "2024", event: "Launch of Location Network System" },
  { year: "Future", event: "Expanding to more cities and waste categories" }
];

const About = () => {
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
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">St. Peter's Engineering College Hackathon Project</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-gradient">EcoConnect</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A revolutionary platform connecting waste generators with recyclers, 
              built by Team BitwiseBinary to create a sustainable future for our communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between waste generators and recyclers by creating an efficient, 
                accessible platform that promotes sustainable waste management practices and reduces 
                environmental impact across communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where no recyclable material goes to waste. We envision a connected 
                ecosystem where every piece of waste finds its way to proper recycling channels, 
                contributing to a circular economy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hackathon Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-6 h-6" />
                  <span className="font-semibold">Hackathon Project</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  St. Peter's Engineering College
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-6">
                  EcoConnect was developed as part of the prestigious hackathon at 
                  St. Peter's Engineering College, where innovation meets sustainability. 
                  Our team, BitwiseBinary, took on the challenge of creating a real-world 
                  solution to waste management problems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-primary-foreground/20 rounded-lg px-4 py-2">
                    <span className="font-semibold">Team:</span> BitwiseBinary
                  </div>
                  <div className="bg-primary-foreground/20 rounded-lg px-4 py-2">
                    <span className="font-semibold">Track:</span> Sustainability
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🏆</div>
                    <p className="font-semibold">Hackathon 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Team <span className="text-gradient">BitwiseBinary</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A passionate group of developers dedicated to building technology that makes a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-card border border-border text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-6 text-4xl">
              👨‍💻
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Team BitwiseBinary</h3>
            <p className="text-primary font-medium mb-4">Full Stack Development Team</p>
            <p className="text-muted-foreground mb-6">
              Passionate developers from St. Peter's Engineering College, building sustainable 
              solutions through innovative technology.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Recycle, title: "Sustainability", description: "Every decision we make considers its environmental impact" },
              { icon: Globe, title: "Accessibility", description: "Making waste management easy and accessible for everyone" },
              { icon: Heart, title: "Community", description: "Building connections that strengthen our communities" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <div className="w-24 shrink-0 text-right">
                  <span className="text-primary font-bold">{milestone.year}</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-gradient-hero shrink-0" />
                <div className="bg-card rounded-xl p-4 shadow-soft border border-border flex-1">
                  <p className="text-foreground">{milestone.event}</p>
                </div>
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
              Join Our Mission
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Be part of the sustainable revolution. Together, we can make a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-network">
                <Button variant="hero" size="lg">
                  Join Network
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/locations-map">
                <Button variant="outline" size="lg">
                  Explore Locations
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

export default About;
