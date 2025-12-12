import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Package,
  CheckCircle,
  Truck,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  request_type: string;
  status: string;
  description: string | null;
  blood_type: string | null;
  units_needed: number | null;
  urgency: string | null;
  created_at: string;
  updated_at: string;
}

const statusSteps = [
  { key: "pending", label: "Request", icon: Clock, description: "Request submitted" },
  { key: "acknowledged", label: "Acknowledged", icon: CheckCircle, description: "Request confirmed" },
  { key: "in_transit", label: "In Transit", icon: Truck, description: "On the way" },
  { key: "delivered", label: "Delivered", icon: Package, description: "Completed" },
];

const getStatusIndex = (status: string): number => {
  const index = statusSteps.findIndex((step) => step.key === status);
  return index >= 0 ? index : 0;
};

const getRequestTypeLabel = (type: string): string => {
  switch (type) {
    case "waste_pickup":
      return "Waste Pickup";
    case "blood_donation":
      return "Blood Donation";
    case "blood_request":
      return "Blood Request";
    default:
      return type;
  }
};

const getRequestTypeColor = (type: string): string => {
  switch (type) {
    case "waste_pickup":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "blood_donation":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "blood_request":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function TrackRequest() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRequests = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter search query",
        description: "Please enter your email or phone number to search.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .or(`user_email.ilike.%${searchQuery}%,user_phone.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRequests(data || []);
    } catch (error) {
      console.error("Error searching requests:", error);
      toast({
        title: "Error",
        description: "Failed to search requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchRequests();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-6">
              <Package className="w-5 h-5" />
              <span className="font-medium">Track Your Request</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Request Tracking
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track the status of your waste pickup or blood donation requests in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Your Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">
                    Search by email or phone
                  </Label>
                  <Input
                    id="search"
                    placeholder="Enter your email or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button onClick={searchRequests} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span className="ml-2">Search</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mt-8 space-y-6">
            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && hasSearched && requests.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Requests Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any requests matching your search. Please check your
                    email or phone number and try again.
                  </p>
                </CardContent>
              </Card>
            )}

            {!isLoading &&
              requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getRequestTypeColor(request.request_type)}>
                              {getRequestTypeLabel(request.request_type)}
                            </Badge>
                            {request.blood_type && (
                              <Badge variant="outline">{request.blood_type}</Badge>
                            )}
                            {request.urgency && request.urgency !== "Normal" && (
                              <Badge variant="destructive">{request.urgency}</Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{request.user_name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Request ID: {request.id.slice(0, 8)}...
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Submitted: {new Date(request.created_at).toLocaleDateString()}</p>
                          <p>Updated: {new Date(request.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Status Timeline */}
                      <div className="relative">
                        <div className="flex justify-between items-center">
                          {statusSteps.map((step, stepIndex) => {
                            const currentIndex = getStatusIndex(request.status);
                            const isCompleted = stepIndex <= currentIndex;
                            const isCurrent = stepIndex === currentIndex;
                            const Icon = step.icon;

                            return (
                              <div
                                key={step.key}
                                className="flex flex-col items-center relative z-10"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    isCompleted
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <span
                                  className={`mt-2 text-xs font-medium ${
                                    isCompleted ? "text-primary" : "text-muted-foreground"
                                  }`}
                                >
                                  {step.label}
                                </span>
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                  {step.description}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{
                              width: `${(getStatusIndex(request.status) / (statusSteps.length - 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Request Details */}
                      {request.description && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                        </div>
                      )}

                      {request.units_needed && (
                        <div className="mt-4 text-sm">
                          <span className="text-muted-foreground">Units needed: </span>
                          <span className="font-medium">{request.units_needed}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* Refresh Button */}
          {hasSearched && requests.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={searchRequests} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh Status
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}