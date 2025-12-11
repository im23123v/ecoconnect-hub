import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { LocationCard } from "./LocationCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { locations, categories, Location, getIconForType, getColorForType, getCategoryForType } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";

export const LocationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbLocations, setDbLocations] = useState<Location[]>([]);
  const [showAll, setShowAll] = useState(false);

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

  const allLocations = useMemo(() => [...locations, ...dbLocations], [dbLocations]);

  const filteredLocations = useMemo(() => {
    let result = allLocations;
    
    if (activeCategory !== "all") {
      result = result.filter((loc) => loc.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((loc) => 
        loc.name.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query) ||
        loc.materials.some(m => m.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [allLocations, activeCategory, searchQuery]);

  const displayedLocations = showAll ? filteredLocations : filteredLocations.slice(0, 8);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setShowAll(false);
  }, []);

  return (
    <section id="locations" className="py-24 bg-eco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
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

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search by name, location, or material..." 
              className="pl-10 h-12 bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{filteredLocations.length} locations found</span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "eco" : "secondary"}
              size="default"
              onClick={() => handleCategoryChange(category.id)}
              className="gap-2 transition-all duration-200"
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedLocations.map((location, index) => (
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

        {/* Empty State */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No locations found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Show More / View All CTA */}
        {filteredLocations.length > 0 && (
          <div className="text-center mt-12 space-y-4">
            {!showAll && filteredLocations.length > 8 && (
              <Button variant="secondary" size="lg" onClick={() => setShowAll(true)}>
                Show More ({filteredLocations.length - 8} remaining)
              </Button>
            )}
            <div>
              <Link to="/locations-map">
                <Button variant="outline" size="lg" className="group">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Locations on Map
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};