import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Locations", href: "/locations-map", isRoute: true },
  { name: "Impact", href: "/impact", isRoute: true },
  { name: "Resources", href: "/resources", isRoute: true },
  { name: "About", href: "/about", isRoute: true },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoConnect</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block">
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/join-network">
              <Button variant="hero" size="default">
                Join Network
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/join-network">
                <Button variant="hero" size="lg" className="w-full mt-4">
                  Join Network
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};