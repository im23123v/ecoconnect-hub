import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MapPin,
  Phone,
  Clock,
  Users,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bloodBanks } from "@/data/bloodBanks";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Normal", "Urgent", "Critical"];

export default function BloodDonation() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("banks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    unitsNeeded: "1",
    urgency: "Normal",
    description: "",
  });

  const filteredBanks = bloodBanks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBloodRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("requests").insert({
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        request_type: "blood_request",
        blood_type: formData.bloodType,
        units_needed: parseInt(formData.unitsNeeded),
        urgency: formData.urgency,
        description: formData.description,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Blood Request Submitted",
        description: "Your request has been submitted. We'll notify matching donors.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodType: "",
        unitsNeeded: "1",
        urgency: "Normal",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonorRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("requests").insert({
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        request_type: "blood_donation",
        blood_type: formData.bloodType,
        description: formData.description || "Available to donate blood",
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Donor Registration Complete",
        description: "Thank you for registering! We'll contact you when there's a matching request.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodType: "",
        unitsNeeded: "1",
        urgency: "Normal",
        description: "",
      });
    } catch (error) {
      console.error("Error registering donor:", error);
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Save Lives Today</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blood Donation Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with blood banks, request blood, or register as a donor.
              Every drop counts in saving lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3">
              <TabsTrigger value="banks" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Blood Banks
              </TabsTrigger>
              <TabsTrigger value="request" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Request Blood
              </TabsTrigger>
              <TabsTrigger value="donate" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Donate
              </TabsTrigger>
            </TabsList>

            {/* Blood Banks Tab */}
            <TabsContent value="banks" className="space-y-6">
              <div className="flex items-center gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search blood banks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{bank.name}</CardTitle>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <Heart className="w-3 h-3 mr-1" />
                            Blood Bank
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{bank.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{bank.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{bank.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{bank.capacity}</span>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-1">
                          {bank.bloodTypes.map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Request Blood Tab */}
            <TabsContent value="request">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Request Blood
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBloodRequest} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Blood Type Required *</Label>
                        <Select
                          value={formData.bloodType}
                          onValueChange={(value) => handleInputChange("bloodType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="units">Units Needed *</Label>
                        <Input
                          id="units"
                          type="number"
                          min="1"
                          max="10"
                          value={formData.unitsNeeded}
                          onChange={(e) => handleInputChange("unitsNeeded", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Urgency Level</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => handleInputChange("urgency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea
                        id="description"
                        placeholder="Hospital name, patient details, any specific requirements..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Blood Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Donate Tab */}
            <TabsContent value="donate">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Register as Blood Donor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonorRegistration} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donor-name">Full Name *</Label>
                        <Input
                          id="donor-name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donor-phone">Phone Number *</Label>
                        <Input
                          id="donor-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donor-email">Email Address *</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Your Blood Type *</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => handleInputChange("bloodType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donor-notes">Additional Notes</Label>
                      <Textarea
                        id="donor-notes"
                        placeholder="Any health conditions, preferred contact times, etc..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium">Donor Eligibility:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Age between 18-65 years</li>
                        <li>Weight at least 50 kg</li>
                        <li>No recent tattoos or piercings (within 6 months)</li>
                        <li>Not pregnant or breastfeeding</li>
                        <li>No recent surgeries (within 6 months)</li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Registering..." : "Register as Donor"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}