import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Clock, Mail, User, Package, 
  Calendar, ArrowLeft, CheckCircle2, XCircle, 
  Building2, Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocationMap } from "@/components/LocationMap";
import { getLocationById } from "@/data/locations";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = getLocationById(id || "");

  if (!location) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h1>
            <Link to="/#locations">
              <Button variant="eco">Back to Locations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const TypeIcon = location.typeIcon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-eco py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/#locations" 
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Locations
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${location.typeColor} mb-4`}>
                <TypeIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{location.type}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {location.name}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl">
                {location.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Location
                  </h2>
                  <LocationMap 
                    lat={location.lat} 
                    lng={location.lng} 
                    name={location.name}
                    address={location.address}
                  />
                </motion.div>

                {/* Pickup Schedule */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Pickup Schedule
                  </h2>
                  
                  <div className="bg-eco-leaf/10 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Truck className="w-6 h-6 text-eco-forest" />
                      <div>
                        <p className="text-sm text-muted-foreground">Next Pickup</p>
                        <p className="text-lg font-semibold text-foreground">{location.nextPickup}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {location.pickupSchedule.map((schedule) => (
                      <div 
                        key={schedule.day}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          schedule.available ? 'bg-muted/50' : 'bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {schedule.available ? (
                            <CheckCircle2 className="w-5 h-5 text-eco-forest" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className={`font-medium ${
                            schedule.available ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {schedule.day}
                          </span>
                        </div>
                        <span className={`text-sm ${
                          schedule.available ? 'text-muted-foreground' : 'text-muted-foreground/50'
                        }`}>
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Materials Accepted */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Materials Accepted
                  </h2>
                  
                  <div className="flex flex-wrap gap-3">
                    {location.materials.map((material) => (
                      <span
                        key={material}
                        className="px-4 py-2 bg-eco-sand text-foreground rounded-lg font-medium"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border sticky top-24"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="text-foreground">{location.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href={`tel:${location.phone}`} className="text-foreground hover:text-primary transition-colors">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${location.email}`} className="text-foreground hover:text-primary transition-colors">
                          {location.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="text-foreground">{location.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Person</p>
                        <p className="text-foreground">{location.contactPerson}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="text-foreground">{location.capacity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button variant="eco" className="w-full">
                      Schedule Pickup
                    </Button>
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationDetail;
