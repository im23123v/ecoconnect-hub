import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Building2, TreePalm, Laptop, Shirt, Utensils, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const locationTypes = [
  { value: "Demolition", label: "Demolition Site", icon: Building2 },
  { value: "Coconut", label: "Coconut Shop", icon: TreePalm },
  { value: "E-Waste", label: "E-Waste Center", icon: Laptop },
  { value: "Textile", label: "Textile Waste", icon: Shirt },
  { value: "Food Waste", label: "Food Waste", icon: Utensils },
];

const defaultSchedule = [
  { day: "Monday", time: "9:00 AM - 5:00 PM", available: true },
  { day: "Tuesday", time: "9:00 AM - 5:00 PM", available: true },
  { day: "Wednesday", time: "9:00 AM - 5:00 PM", available: true },
  { day: "Thursday", time: "9:00 AM - 5:00 PM", available: true },
  { day: "Friday", time: "9:00 AM - 5:00 PM", available: true },
  { day: "Saturday", time: "9:00 AM - 1:00 PM", available: true },
  { day: "Sunday", time: "Closed", available: false },
];

export default function JoinNetwork() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [schedule, setSchedule] = useState(defaultSchedule);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    hours: "",
    type: "",
    description: "",
    contactPerson: "",
    lat: "",
    lng: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const removeMaterial = (material: string) => {
    setMaterials(materials.filter(m => m !== material));
  };

  const updateSchedule = (index: number, field: string, value: string | boolean) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    setSchedule(updated);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Demolition": return "Building2";
      case "Coconut": return "TreePalm";
      case "E-Waste": return "Laptop";
      case "Textile": return "Shirt";
      case "Food Waste": return "Utensils";
      default: return "MapPin";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Demolition": return "bg-eco-earth/20 text-eco-earth";
      case "Coconut": return "bg-eco-leaf/20 text-eco-forest";
      case "E-Waste": return "bg-blue-500/20 text-blue-700";
      case "Textile": return "bg-purple-500/20 text-purple-700";
      case "Food Waste": return "bg-amber-500/20 text-amber-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.phone || !formData.type || !formData.lat || !formData.lng) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("locations").insert({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email || null,
        hours: formData.hours,
        type: formData.type,
        type_icon: getTypeIcon(formData.type),
        type_color: getTypeColor(formData.type),
        materials: materials,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        description: formData.description || null,
        contact_person: formData.contactPerson || null,
        pickup_schedule: schedule,
      });

      if (error) throw error;

      toast({
        title: "Location Added!",
        description: "Your location has been successfully added to the network.",
      });

      navigate("/locations-map");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Header */}
        <div className="bg-eco-cream py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Join the <span className="text-gradient">Network</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Add your waste collection point and connect with recyclers
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Location Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Green Demolition Yard"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="type">Location Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, City, State, PIN"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lat">Latitude *</Label>
                  <Input
                    id="lat"
                    name="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={handleInputChange}
                    placeholder="e.g., 13.0827"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude *</Label>
                  <Input
                    id="lng"
                    name="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={handleInputChange}
                    placeholder="e.g., 80.2707"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground sm:col-span-2">
                  Get coordinates from Google Maps by right-clicking on your location
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Operating Hours</Label>
                  <Input
                    id="hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="e.g., Mon-Sat: 9AM - 6PM"
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Materials Accepted</h2>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="Add a material"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMaterial())}
                />
                <Button type="button" onClick={addMaterial} variant="secondary">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <span
                    key={material}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {material}
                    <button type="button" onClick={() => removeMaterial(material)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {materials.length === 0 && (
                  <p className="text-sm text-muted-foreground">Add materials that you accept for recycling</p>
                )}
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Pickup Schedule</h2>
              <div className="space-y-3">
                {schedule.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-foreground">{day.day}</span>
                    <Input
                      value={day.time}
                      onChange={(e) => updateSchedule(index, "time", e.target.value)}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="flex-1"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={day.available}
                        onChange={(e) => updateSchedule(index, "available", e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-muted-foreground">Available</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your location, what you do, and how you contribute to sustainable waste management..."
                rows={4}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" variant="eco" size="lg" disabled={loading} className="flex-1">
                {loading ? "Adding Location..." : "Add Location to Network"}
              </Button>
              <Link to="/">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
