import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LocationCard } from "./LocationCard";
import { Button } from "./ui/button";
import { locations, categories, Location, getIconForType, getColorForType, getCategoryForType } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";

export const LocationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbLocations, setDbLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchDbLocations = async () => {
      const { data } = await supabase.from("locations").select("*");
      if (data) {
        const mapped = data.map((loc: any) => ({
          id: loc.id,
          name: loc.name,
          address: loc.address,
          phone: loc.phone,
          hours: loc.hours,
          type: loc.type,
          category: getCategoryForType(loc.type),
          typeIcon: getIconForType(loc.type),
          typeColor: getColorForType(loc.type),
          materials: loc.materials || [],
          lat: parseFloat(loc.lat),
          lng: parseFloat(loc.lng),
          description: loc.description || "",
          pickupSchedule: loc.pickup_schedule || [],
          contactPerson: loc.contact_person || "",
          email: loc.email || "",
          capacity: "",
          nextPickup: ""
        }));
        setDbLocations(mapped);
      }
    };
    fetchDbLocations();
  }, []);

  const allLocations = [...locations, ...dbLocations];

  const filteredLocations =
    activeCategory === "all"
      ? allLocations
      : allLocations.filter((loc) => loc.category === activeCategory);

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
              id={location.id}
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
          <Link to="/locations-map">
            <Button variant="outline" size="lg">
              View All Locations on Map
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};