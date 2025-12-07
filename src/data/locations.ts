import { Building2, TreePalm, Laptop, Shirt, Utensils, Filter, LucideIcon } from "lucide-react";

export interface PickupSchedule {
  day: string;
  time: string;
  available: boolean;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  type: string;
  category: string;
  typeIcon: LucideIcon;
  typeColor: string;
  materials: string[];
  lat: number;
  lng: number;
  description: string;
  pickupSchedule: PickupSchedule[];
  contactPerson: string;
  email: string;
  capacity: string;
  nextPickup: string;
}

export const categories = [
  { id: "all", name: "All Locations", icon: Filter },
  { id: "demolition", name: "Demolition Sites", icon: Building2 },
  { id: "coconut", name: "Coconut Shops", icon: TreePalm },
  { id: "ewaste", name: "E-Waste", icon: Laptop },
  { id: "textile", name: "Textile Waste", icon: Shirt },
  { id: "food", name: "Food Waste", icon: Utensils },
];

export const locations: Location[] = [
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
    lat: 13.0827,
    lng: 80.2707,
    description: "One of Chennai's largest demolition material recovery centers. We specialize in salvaging quality construction materials from demolished buildings for reuse in new construction projects.",
    pickupSchedule: [
      { day: "Monday", time: "8:00 AM - 12:00 PM", available: true },
      { day: "Tuesday", time: "8:00 AM - 12:00 PM", available: true },
      { day: "Wednesday", time: "2:00 PM - 6:00 PM", available: true },
      { day: "Thursday", time: "8:00 AM - 12:00 PM", available: true },
      { day: "Friday", time: "2:00 PM - 6:00 PM", available: true },
      { day: "Saturday", time: "8:00 AM - 2:00 PM", available: true },
      { day: "Sunday", time: "Closed", available: false },
    ],
    contactPerson: "Rajesh Kumar",
    email: "contact@greenbuild.in",
    capacity: "500+ tons/month",
    nextPickup: "Tomorrow, 8:00 AM",
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
    lat: 12.7872,
    lng: 80.2556,
    description: "Family-run coconut shop producing 200+ coconuts daily. All waste including shells, husks, and fiber are collected for conversion into eco-friendly products.",
    pickupSchedule: [
      { day: "Monday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Tuesday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Wednesday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Thursday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Friday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Saturday", time: "6:00 AM - 8:00 AM", available: true },
      { day: "Sunday", time: "7:00 AM - 9:00 AM", available: true },
    ],
    contactPerson: "V. Raja",
    email: "rajacoconut@gmail.com",
    capacity: "50 kg shells/day",
    nextPickup: "Today, 6:00 AM",
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
    lat: 12.9716,
    lng: 77.5946,
    description: "Certified e-waste recycling facility handling electronic waste from IT companies and individual consumers. Proper disposal and material recovery ensured.",
    pickupSchedule: [
      { day: "Monday", time: "10:00 AM - 4:00 PM", available: true },
      { day: "Tuesday", time: "10:00 AM - 4:00 PM", available: true },
      { day: "Wednesday", time: "10:00 AM - 4:00 PM", available: true },
      { day: "Thursday", time: "10:00 AM - 4:00 PM", available: true },
      { day: "Friday", time: "10:00 AM - 2:00 PM", available: true },
      { day: "Saturday", time: "Closed", available: false },
      { day: "Sunday", time: "Closed", available: false },
    ],
    contactPerson: "Anitha Sharma",
    email: "info@techrecyclehub.com",
    capacity: "2 tons/week",
    nextPickup: "Monday, 10:00 AM",
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
    lat: 17.3850,
    lng: 78.4867,
    description: "Leading demolition contractor in Hyderabad with a focus on sustainable material recovery. Our aggregates are used in road construction and new building foundations.",
    pickupSchedule: [
      { day: "Monday", time: "7:00 AM - 11:00 AM", available: true },
      { day: "Tuesday", time: "3:00 PM - 7:00 PM", available: true },
      { day: "Wednesday", time: "7:00 AM - 11:00 AM", available: true },
      { day: "Thursday", time: "3:00 PM - 7:00 PM", available: true },
      { day: "Friday", time: "7:00 AM - 11:00 AM", available: true },
      { day: "Saturday", time: "7:00 AM - 1:00 PM", available: true },
      { day: "Sunday", time: "Closed", available: false },
    ],
    contactPerson: "Mohammed Imran",
    email: "urbandemo@construction.in",
    capacity: "800+ tons/month",
    nextPickup: "Today, 3:00 PM",
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
    lat: 13.0500,
    lng: 80.2824,
    description: "Popular beachside coconut vendor with high daily turnover. Partners with local artisans who transform coconut shells into decorative items and activated charcoal.",
    pickupSchedule: [
      { day: "Monday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Tuesday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Wednesday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Thursday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Friday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Saturday", time: "5:00 AM - 7:00 AM", available: true },
      { day: "Sunday", time: "6:00 AM - 8:00 AM", available: true },
    ],
    contactPerson: "S. Murugan",
    email: "tenderpoint@gmail.com",
    capacity: "80 kg shells/day",
    nextPickup: "Tomorrow, 5:00 AM",
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
    lat: 11.0168,
    lng: 76.9558,
    description: "Collection center for textile manufacturing waste. Fabric scraps are sorted and sent to recyclers who create new yarn, insulation materials, and industrial rags.",
    pickupSchedule: [
      { day: "Monday", time: "10:00 AM - 2:00 PM", available: true },
      { day: "Tuesday", time: "2:00 PM - 6:00 PM", available: true },
      { day: "Wednesday", time: "10:00 AM - 2:00 PM", available: true },
      { day: "Thursday", time: "2:00 PM - 6:00 PM", available: true },
      { day: "Friday", time: "10:00 AM - 2:00 PM", available: true },
      { day: "Saturday", time: "10:00 AM - 2:00 PM", available: true },
      { day: "Sunday", time: "Closed", available: false },
    ],
    contactPerson: "Lakshmi Narayanan",
    email: "collect@fabricforward.in",
    capacity: "300 kg/week",
    nextPickup: "Wednesday, 10:00 AM",
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
    lat: 19.0760,
    lng: 72.8777,
    description: "Mumbai's premier 24/7 demolition operation. We handle large-scale commercial and residential demolitions with complete material sorting and recovery systems.",
    pickupSchedule: [
      { day: "Monday", time: "Available 24/7", available: true },
      { day: "Tuesday", time: "Available 24/7", available: true },
      { day: "Wednesday", time: "Available 24/7", available: true },
      { day: "Thursday", time: "Available 24/7", available: true },
      { day: "Friday", time: "Available 24/7", available: true },
      { day: "Saturday", time: "Available 24/7", available: true },
      { day: "Sunday", time: "Available 24/7", available: true },
    ],
    contactPerson: "Vikram Patel",
    email: "operations@metrodemo.com",
    capacity: "1200+ tons/month",
    nextPickup: "Anytime",
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
    lat: 18.5204,
    lng: 73.8567,
    description: "Food waste processing facility converting organic waste into compost and biogas. We partner with restaurants, hotels, and food manufacturers across Pune.",
    pickupSchedule: [
      { day: "Monday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Tuesday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Wednesday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Thursday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Friday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Saturday", time: "6:00 AM - 10:00 AM", available: true },
      { day: "Sunday", time: "Closed", available: false },
    ],
    contactPerson: "Dr. Priya Deshmukh",
    email: "hello@biofoodprocessors.in",
    capacity: "5 tons/day",
    nextPickup: "Tomorrow, 6:00 AM",
  },
];

export const getLocationById = (id: number): Location | undefined => {
  return locations.find((loc) => loc.id === id);
};
