import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Code2 } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Impact", href: "/impact" },
    { name: "Join Network", href: "/join-network" },
    { name: "Locations", href: "/locations-map" },
  ],
  resources: [
    { name: "Guides", href: "/resources" },
    { name: "FAQs", href: "/resources" },
    { name: "Waste Categories", href: "/impact" },
    { name: "Tips", href: "/resources" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer id="about" className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">EcoConnect</span>
              </div>
              <p className="text-primary-foreground/70 mb-6 max-w-sm">
                Building a sustainable future by connecting waste producers with recyclers. 
                Every piece of waste is a resource waiting to be discovered.
              </p>
              
              {/* Hackathon Badge */}
              <div className="bg-primary-foreground/10 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">Hackathon Project</span>
                </div>
                <p className="text-sm text-primary-foreground/70">
                  Developed by <span className="font-semibold text-primary-foreground">Team BitwiseBinary</span> at St. Peter's Engineering College Hackathon
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Mail className="w-4 h-4" />
                  <span>contact@ecoconnect.in</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Phone className="w-4 h-4" />
                  <span>+91 1800-ECO-HELP</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="w-4 h-4" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-center sm:text-left">
            <p className="text-sm text-primary-foreground/60">
              © 2024 EcoConnect. All rights reserved. Made with 💚 for the planet.
            </p>
            <p className="text-xs text-primary-foreground/40 mt-1">
              A project by Team BitwiseBinary • St. Peter's Engineering College Hackathon
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};