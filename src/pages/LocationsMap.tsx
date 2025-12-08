import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { locations, categories, Location } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";

export default function LocationsMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbLocations, setDbLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchDbLocations();
  }, []);

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
        category: loc.type.toLowerCase().replace("-", "").replace(" ", ""),
        typeIcon: categories.find(c => c.name.toLowerCase().includes(loc.type.toLowerCase()))?.icon || MapPin,
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

  const getColorForType = (type: string): string => {
    switch (type.toLowerCase()) {
      case "demolition": return "bg-eco-earth/20 text-eco-earth";
      case "coconut": return "bg-eco-leaf/20 text-eco-forest";
      case "e-waste": return "bg-blue-500/20 text-blue-700";
      case "textile": return "bg-purple-500/20 text-purple-700";
      case "food waste": return "bg-amber-500/20 text-amber-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const allLocations = [...locations, ...dbLocations];
  
  const filteredLocations = activeCategory === "all"
    ? allLocations
    : allLocations.filter((loc) => loc.category === activeCategory);

  const mapUrl = selectedLocation 
    ? `https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=20.5937,78.9629&t=&z=5&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <div className="bg-eco-cream py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/#locations">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              All <span className="text-gradient">Locations</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              View all {allLocations.length} collection points across India
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-background border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "eco" : "secondary"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="gap-2"
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Map and List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-300px)] min-h-[600px]">
            {/* Location List */}
            <div className="lg:col-span-1 overflow-y-auto rounded-xl border border-border bg-card">
              <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
                <h2 className="font-semibold text-foreground">
                  {filteredLocations.length} Locations
                </h2>
              </div>
              <div className="divide-y divide-border">
                {filteredLocations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedLocation?.id === location.id ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${location.typeColor}`}>
                      <location.typeIcon className="w-3 h-3" />
                      {location.type}
                    </div>
                    <h3 className="font-medium text-foreground text-sm">{location.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{location.address}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Map and Details */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Large Map */}
              <div className="flex-1 rounded-xl overflow-hidden border border-border shadow-card relative min-h-[400px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locations Map"
                  className="absolute inset-0"
                />
              </div>

              {/* Selected Location Details */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${selectedLocation.typeColor}`}>
                        <selectedLocation.typeIcon className="w-3 h-3" />
                        {selectedLocation.type}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{selectedLocation.name}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLocation(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{selectedLocation.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{selectedLocation.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{selectedLocation.hours}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Materials Accepted</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.materials.map((material) => (
                        <span
                          key={material}
                          className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/location/${selectedLocation.id}`}>
                      <Button variant="eco" size="sm">View Full Details</Button>
                    </Link>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">Get Directions</Button>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
