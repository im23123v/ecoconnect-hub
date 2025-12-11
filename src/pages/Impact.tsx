import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  TrendingUp, 
  Recycle, 
  Users, 
  MapPin, 
  Leaf, 
  BarChart3,
  ArrowRight,
  Building2,
  Truck,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Impact = () => {
  const { data: locationCount = 0 } = useQuery({
    queryKey: ["locationCount"],
    queryFn: async () => {
      const { count } = await supabase
        .from("locations")
        .select("*", { count: "exact", head: true });
      return count || 0;
    }
  });

  const { data: locationsByType = [] } = useQuery({
    queryKey: ["locationsByType"],
    queryFn: async () => {
      const { data } = await supabase
        .from("locations")
        .select("type");
      
      const counts: Record<string, number> = {};
      data?.forEach(loc => {
        counts[loc.type] = (counts[loc.type] || 0) + 1;
      });
      
      return Object.entries(counts).map(([type, count]) => ({ type, count }));
    }
  });

  const stats = [
    { 
      icon: MapPin, 
      value: locationCount, 
      label: "Collection Points", 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      icon: Recycle, 
      value: "5", 
      label: "Waste Categories", 
      color: "text-eco-moss",
      bgColor: "bg-eco-moss/10"
    },
    { 
      icon: Users, 
      value: "500+", 
      label: "Active Users", 
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    { 
      icon: TrendingUp, 
      value: "10K+", 
      label: "KG Waste Recycled", 
      color: "text-eco-earth",
      bgColor: "bg-eco-earth/10"
    }
  ];

  const wasteCategories = [
    { 
      name: "Demolition Waste", 
      icon: Building2, 
      impact: "Reduces landfill burden by repurposing construction materials",
      materials: ["Bricks", "Concrete", "Steel", "Wood"],
      color: "bg-orange-500"
    },
    { 
      name: "Coconut Waste", 
      icon: Leaf, 
      impact: "Transforms agricultural waste into valuable products",
      materials: ["Shells", "Husks", "Coir Fiber"],
      color: "bg-amber-600"
    },
    { 
      name: "E-Waste", 
      icon: BarChart3, 
      impact: "Prevents toxic materials from contaminating the environment",
      materials: ["Electronics", "Batteries", "Cables", "Circuit Boards"],
      color: "bg-blue-500"
    },
    { 
      name: "Textile Waste", 
      icon: Scale, 
      impact: "Reduces fashion industry's environmental footprint",
      materials: ["Clothes", "Fabric Scraps", "Leather", "Threads"],
      color: "bg-purple-500"
    },
    { 
      name: "Food Waste", 
      icon: Truck, 
      impact: "Converts organic waste into compost and biogas",
      materials: ["Vegetable Waste", "Fruit Peels", "Coffee Grounds"],
      color: "bg-green-500"
    }
  ];

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
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Making a Difference</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Track the positive environmental impact we're creating together through 
              sustainable waste management and recycling initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
              >
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Waste Categories We Handle
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each category has a unique environmental impact and recycling process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{category.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {category.materials.map((material) => (
                    <span 
                      key={material}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Collection Points by Category
              </h2>
              <p className="text-primary-foreground/90">
                Real-time data from our network
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {locationsByType.map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-foreground/20 rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold mb-1">{item.count}</div>
                  <p className="text-sm text-primary-foreground/80">{item.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Environmental Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                metric: "30%", 
                label: "Reduction in Landfill Waste",
                description: "By connecting waste generators with recyclers"
              },
              { 
                metric: "50+", 
                label: "Tons of CO2 Saved",
                description: "Through proper waste management and recycling"
              },
              { 
                metric: "100%", 
                label: "Recyclable Materials Tracked",
                description: "Complete transparency in waste management"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border text-center"
              >
                <div className="text-5xl font-bold text-gradient mb-2">{benefit.metric}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.label}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
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
              Be Part of the Change
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join our growing network and contribute to a sustainable future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-network">
                <Button variant="hero" size="lg">
                  Add Your Location
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/locations-map">
                <Button variant="outline" size="lg">
                  Find Collection Points
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

export default Impact;
