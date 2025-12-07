import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, TreePalm, Laptop, Shirt, Factory, Utensils, Filter } from "lucide-react";
import { LocationCard } from "./LocationCard";
import { Button } from "./ui/button";

const categories = [
  { id: "all", name: "All Locations", icon: Filter },
  { id: "demolition", name: "Demolition Sites", icon: Building2 },
  { id: "coconut", name: "Coconut Shops", icon: TreePalm },
  { id: "ewaste", name: "E-Waste", icon: Laptop },
  { id: "textile", name: "Textile Waste", icon: Shirt },
  { id: "food", name: "Food Waste", icon: Utensils },
];

const locations = [
  {
    id: 1,
    name: "GreenBuild Demolition Yard",
    address: "42 Industrial Avenue, Chennai, TN 600032",
    phone: "+91 98765 43210",
    hours: "Mon-Sat: 8AM - 6PM",
    type: "Demolition",
    category: "demolition",
    typeIcon: Building2,
    typeColor: "bg-eco-earth/20 text-eco-earth",
    materials: ["Concrete", "Bricks", "Steel", "Wood"],
  },
  {
    id: 2,
    name: "Raja Coconut Center",
    address: "15 Beach Road, Kovalam, TN 603112",
    phone: "+91 87654 32109",
    hours: "Daily: 6AM - 8PM",
    type: "Coconut",
    category: "coconut",
    typeIcon: TreePalm,
    typeColor: "bg-eco-leaf/20 text-eco-forest",
    materials: ["Coconut Shells", "Husk", "Fiber", "Water"],
  },
  {
    id: 3,
    name: "TechRecycle Hub",
    address: "78 IT Park, Bangalore, KA 560066",
    phone: "+91 76543 21098",
    hours: "Mon-Fri: 9AM - 5PM",
    type: "E-Waste",
    category: "ewaste",
    typeIcon: Laptop,
    typeColor: "bg-blue-500/20 text-blue-700",
    materials: ["Computers", "Phones", "Cables", "Batteries"],
  },
  {
    id: 4,
    name: "UrbanDemo Construction",
    address: "23 Metro Junction, Hyderabad, TS 500081",
    phone: "+91 65432 10987",
    hours: "Mon-Sat: 7AM - 7PM",
    type: "Demolition",
    category: "demolition",
    typeIcon: Building2,
    typeColor: "bg-eco-earth/20 text-eco-earth",
    materials: ["Rubble", "Tiles", "Iron", "Aggregates"],
  },
  {
    id: 5,
    name: "Tender Coconut Point",
    address: "89 Marina Beach Rd, Chennai, TN 600001",
    phone: "+91 54321 09876",
    hours: "Daily: 5AM - 10PM",
    type: "Coconut",
    category: "coconut",
    typeIcon: TreePalm,
    typeColor: "bg-eco-leaf/20 text-eco-forest",
    materials: ["Fresh Shells", "Coir", "Pith", "Charcoal Base"],
  },
  {
    id: 6,
    name: "FabricForward Collect",
    address: "56 Textile Hub, Coimbatore, TN 641018",
    phone: "+91 43210 98765",
    hours: "Mon-Sat: 10AM - 6PM",
    type: "Textile",
    category: "textile",
    typeIcon: Shirt,
    typeColor: "bg-purple-500/20 text-purple-700",
    materials: ["Cotton Waste", "Synthetic", "Denim", "Linen"],
  },
  {
    id: 7,
    name: "Metro Demolition Co.",
    address: "101 Highway Jct, Mumbai, MH 400001",
    phone: "+91 32109 87654",
    hours: "24/7 Operations",
    type: "Demolition",
    category: "demolition",
    typeIcon: Building2,
    typeColor: "bg-eco-earth/20 text-eco-earth",
    materials: ["Concrete", "Glass", "Metal Scrap", "Plaster"],
  },
  {
    id: 8,
    name: "BioFood Processors",
    address: "33 Agri Zone, Pune, MH 411001",
    phone: "+91 21098 76543",
    hours: "Mon-Sat: 6AM - 4PM",
    type: "Food Waste",
    category: "food",
    typeIcon: Utensils,
    typeColor: "bg-amber-500/20 text-amber-700",
    materials: ["Organic Waste", "Peels", "Scraps", "Expired Goods"],
  },
];

export const LocationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLocations =
    activeCategory === "all"
      ? locations
      : locations.filter((loc) => loc.category === activeCategory);

  return (
    <section id="locations" className="py-24 bg-eco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Collection <span className="text-gradient">Locations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find waste collection points near you. From demolition sites to coconut vendors, 
            we connect all waste sources to recycling partners.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "eco" : "secondary"}
              size="default"
              onClick={() => setActiveCategory(category.id)}
              className="gap-2"
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLocations.map((location, index) => (
            <LocationCard
              key={location.id}
              name={location.name}
              address={location.address}
              phone={location.phone}
              hours={location.hours}
              type={location.type}
              typeIcon={location.typeIcon}
              typeColor={location.typeColor}
              materials={location.materials}
              index={index}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Locations on Map
          </Button>
        </motion.div>
      </div>
    </section>
  );
};