import { useState, useEffect } from "react";
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
  Package,
  Truck,
  CircleCheck,
  Circle,
  RefreshCw,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bloodBanks } from "@/data/bloodBanks";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Normal", "Urgent", "Critical"];

interface BloodRequest {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  blood_type: string | null;
  units_needed: number | null;
  urgency: string | null;
  description: string | null;
  status: string;
  request_type: string;
  created_at: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  acknowledged_at: string | null;
  pickup_at: string | null;
  in_transit_at: string | null;
  delivered_at: string | null;
  current_location: string | null;
}

const trackingSteps = [
  { key: "pending", label: "Request Created", icon: Circle },
  { key: "acknowledged", label: "Donor Acknowledged", icon: CheckCircle },
  { key: "pickup", label: "Ready for Pickup", icon: Package },
  { key: "in_transit", label: "In Transit", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CircleCheck },
];

const getStatusIndex = (status: string) => {
  const index = trackingSteps.findIndex((step) => step.key === status);
  return index === -1 ? 0 : index;
};

export default function BloodDonation() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [donations, setDonations] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    unitsNeeded: "1",
    urgency: "Normal",
    description: "",
  });
  const [donorFormData, setDonorFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const filteredBanks = bloodBanks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const { data: requestsData, error: reqError } = await supabase
        .from("requests")
        .select("*")
        .eq("request_type", "blood_request")
        .order("created_at", { ascending: false });

      const { data: donationsData, error: donError } = await supabase
        .from("requests")
        .select("*")
        .eq("request_type", "blood_donation")
        .order("created_at", { ascending: false });

      if (reqError) throw reqError;
      if (donError) throw donError;

      setRequests((requestsData as BloodRequest[]) || []);
      setDonations((donationsData as BloodRequest[]) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDonorInputChange = (field: string, value: string) => {
    setDonorFormData((prev) => ({ ...prev, [field]: value }));
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
        description: "Your request is now visible to all donors.",
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
      fetchRequests();
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
        description: "Your availability is now visible to everyone.",
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
      fetchRequests();
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

  const handleAcknowledge = async (requestId: string) => {
    if (!donorFormData.name || !donorFormData.phone) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and phone number to acknowledge.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("requests")
        .update({
          status: "acknowledged",
          donor_name: donorFormData.name,
          donor_email: donorFormData.email,
          donor_phone: donorFormData.phone,
          acknowledged_at: new Date().toISOString(),
          current_location: "Donor contacted",
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Request Acknowledged",
        description: "You have acknowledged this blood request.",
      });
      setDonorFormData({ name: "", email: "", phone: "" });
      fetchRequests();
    } catch (error) {
      console.error("Error acknowledging:", error);
      toast({
        title: "Error",
        description: "Failed to acknowledge. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: string | null) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Urgent":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              View active blood requests, track donations in real-time, and help save lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
              <TabsTrigger value="requests" className="flex items-center gap-1 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Requests</span>
              </TabsTrigger>
              <TabsTrigger value="donations" className="flex items-center gap-1 text-xs sm:text-sm">
                <Droplets className="w-4 h-4" />
                <span className="hidden sm:inline">Donors</span>
              </TabsTrigger>
              <TabsTrigger value="banks" className="flex items-center gap-1 text-xs sm:text-sm">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Banks</span>
              </TabsTrigger>
              <TabsTrigger value="new-request" className="flex items-center gap-1 text-xs sm:text-sm">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Request</span>
              </TabsTrigger>
              <TabsTrigger value="donate" className="flex items-center gap-1 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Donate</span>
              </TabsTrigger>
            </TabsList>

            {/* All Blood Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Active Blood Requests</h2>
                <Button variant="outline" size="sm" onClick={fetchRequests}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No blood requests at the moment.
                </div>
              ) : (
                <div className="space-y-6">
                  {requests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <CardHeader className="pb-3 bg-muted/30">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <Droplets className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{request.user_name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(request.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="text-lg px-3 py-1 bg-red-600 text-white">
                                {request.blood_type}
                              </Badge>
                              <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                                {request.urgency}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{request.user_phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>{request.units_needed} units needed</span>
                            </div>
                            {request.description && (
                              <div className="md:col-span-3 text-muted-foreground">
                                {request.description}
                              </div>
                            )}
                          </div>

                          {/* Amazon-like Tracking Timeline */}
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-medium mb-4 flex items-center gap-2">
                              <Truck className="w-4 h-4" />
                              Tracking Status
                            </h4>
                            <div className="flex items-center justify-between relative">
                              {/* Progress Line */}
                              <div className="absolute top-4 left-0 right-0 h-1 bg-muted rounded-full" />
                              <div
                                className="absolute top-4 left-0 h-1 bg-primary rounded-full transition-all duration-500"
                                style={{
                                  width: `${(getStatusIndex(request.status) / (trackingSteps.length - 1)) * 100}%`,
                                }}
                              />

                              {trackingSteps.map((step, stepIndex) => {
                                const currentIndex = getStatusIndex(request.status);
                                const isCompleted = stepIndex <= currentIndex;
                                const isCurrent = stepIndex === currentIndex;
                                const StepIcon = step.icon;

                                return (
                                  <div
                                    key={step.key}
                                    className="flex flex-col items-center z-10"
                                  >
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                        isCompleted
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-muted-foreground"
                                      } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                                    >
                                      <StepIcon className="w-4 h-4" />
                                    </div>
                                    <span
                                      className={`text-xs mt-2 text-center max-w-[60px] ${
                                        isCompleted ? "text-primary font-medium" : "text-muted-foreground"
                                      }`}
                                    >
                                      {step.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {request.current_location && (
                              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="font-medium">Current Status:</span>
                                <span className="text-muted-foreground">{request.current_location}</span>
                              </div>
                            )}

                            {/* Timestamp Details */}
                            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                              {request.created_at && (
                                <div>
                                  <span className="text-muted-foreground">Created:</span>
                                  <br />
                                  {formatDate(request.created_at)}
                                </div>
                              )}
                              {request.acknowledged_at && (
                                <div>
                                  <span className="text-muted-foreground">Acknowledged:</span>
                                  <br />
                                  {formatDate(request.acknowledged_at)}
                                </div>
                              )}
                              {request.pickup_at && (
                                <div>
                                  <span className="text-muted-foreground">Pickup:</span>
                                  <br />
                                  {formatDate(request.pickup_at)}
                                </div>
                              )}
                              {request.in_transit_at && (
                                <div>
                                  <span className="text-muted-foreground">In Transit:</span>
                                  <br />
                                  {formatDate(request.in_transit_at)}
                                </div>
                              )}
                              {request.delivered_at && (
                                <div>
                                  <span className="text-muted-foreground">Delivered:</span>
                                  <br />
                                  {formatDate(request.delivered_at)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Donor Acknowledge Section */}
                          {request.status === "pending" && (
                            <div className="border-t border-border pt-4">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Want to help? Acknowledge this request
                              </h4>
                              <div className="grid md:grid-cols-4 gap-3">
                                <Input
                                  placeholder="Your Name *"
                                  value={donorFormData.name}
                                  onChange={(e) => handleDonorInputChange("name", e.target.value)}
                                />
                                <Input
                                  placeholder="Phone *"
                                  value={donorFormData.phone}
                                  onChange={(e) => handleDonorInputChange("phone", e.target.value)}
                                />
                                <Input
                                  placeholder="Email (optional)"
                                  value={donorFormData.email}
                                  onChange={(e) => handleDonorInputChange("email", e.target.value)}
                                />
                                <Button onClick={() => handleAcknowledge(request.id)}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Acknowledge
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Show donor info if acknowledged */}
                          {request.donor_name && (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                              <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                                Donor Information
                              </h4>
                              <div className="grid md:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Name:</span>{" "}
                                  {request.donor_name}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Phone:</span>{" "}
                                  {request.donor_phone}
                                </div>
                                {request.donor_email && (
                                  <div>
                                    <span className="text-muted-foreground">Email:</span>{" "}
                                    {request.donor_email}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* All Donations Tab */}
            <TabsContent value="donations" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Available Donors</h2>
                <Button variant="outline" size="sm" onClick={fetchRequests}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : donations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No donors registered yet. Be the first to register!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donations.map((donor, index) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Heart className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{donor.user_name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  Registered {formatDate(donor.created_at)}
                                </p>
                              </div>
                            </div>
                            <Badge className="text-lg px-3 py-1 bg-red-600 text-white">
                              {donor.blood_type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{donor.user_phone}</span>
                          </div>
                          {donor.description && (
                            <p className="text-sm text-muted-foreground">{donor.description}</p>
                          )}
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Available to Donate
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

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

            {/* New Request Tab */}
            <TabsContent value="new-request">
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
                      <h4 className="font-medium">Donor Eligibility</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Must be 18-65 years old</li>
                        <li>Weight should be at least 50 kg</li>
                        <li>No blood donation in the last 3 months</li>
                        <li>No recent tattoos or piercings (within 6 months)</li>
                        <li>Generally in good health</li>
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
