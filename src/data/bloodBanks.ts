import { Heart } from "lucide-react";

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  bloodTypes: string[];
  lat: number;
  lng: number;
  capacity: string;
  email: string;
}

export const bloodBanks: BloodBank[] = [
  {
    id: "bb1",
    name: "Apollo Blood Bank",
    address: "21 Greams Road, Chennai, TN 600006",
    phone: "+91 44 2829 0200",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    lat: 13.0612,
    lng: 80.2504,
    capacity: "500+ units available",
    email: "bloodbank@apollohospitals.com",
  },
  {
    id: "bb2",
    name: "Red Cross Blood Center",
    address: "86 Armenian Street, Kolkata, WB 700001",
    phone: "+91 33 2248 8686",
    hours: "8 AM - 8 PM",
    bloodTypes: ["A+", "B+", "O+", "O-", "AB+"],
    lat: 22.5726,
    lng: 88.3639,
    capacity: "300+ units available",
    email: "kolkata@redcross.org.in",
  },
  {
    id: "bb3",
    name: "Tata Memorial Blood Bank",
    address: "Dr. E Borges Road, Parel, Mumbai, MH 400012",
    phone: "+91 22 2417 7000",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    lat: 19.0048,
    lng: 72.8423,
    capacity: "800+ units available",
    email: "bloodbank@tmc.gov.in",
  },
  {
    id: "bb4",
    name: "AIIMS Blood Bank",
    address: "Ansari Nagar, New Delhi 110029",
    phone: "+91 11 2658 8500",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    lat: 28.5672,
    lng: 77.2100,
    capacity: "1000+ units available",
    email: "bloodbank@aiims.edu",
  },
  {
    id: "bb5",
    name: "Narayana Blood Bank",
    address: "258/A Bommasandra, Bangalore, KA 560099",
    phone: "+91 80 7122 2222",
    hours: "24/7",
    bloodTypes: ["A+", "B+", "O+", "O-", "AB+", "AB-"],
    lat: 12.8166,
    lng: 77.6754,
    capacity: "600+ units available",
    email: "bloodbank@narayanahealth.org",
  },
  {
    id: "bb6",
    name: "Government Blood Bank",
    address: "King George Hospital, Visakhapatnam, AP 530002",
    phone: "+91 891 256 4891",
    hours: "8 AM - 6 PM",
    bloodTypes: ["A+", "B+", "O+", "AB+"],
    lat: 17.7215,
    lng: 83.3074,
    capacity: "200+ units available",
    email: "bloodbank@kgh.ap.gov.in",
  },
  {
    id: "bb7",
    name: "Care Blood Bank",
    address: "Road No. 1, Banjara Hills, Hyderabad, TS 500034",
    phone: "+91 40 6810 6810",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    lat: 17.4156,
    lng: 78.4347,
    capacity: "450+ units available",
    email: "bloodbank@carehospitals.com",
  },
  {
    id: "bb8",
    name: "Fortis Blood Bank",
    address: "Sector 62, Phase VIII, Mohali, PB 160062",
    phone: "+91 172 469 2222",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-"],
    lat: 30.7051,
    lng: 76.8009,
    capacity: "350+ units available",
    email: "bloodbank@fortishealthcare.com",
  },
  {
    id: "bb9",
    name: "Medanta Blood Bank",
    address: "CH Baktawar Singh Road, Gurugram, HR 122001",
    phone: "+91 124 414 1414",
    hours: "24/7",
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    lat: 28.4395,
    lng: 77.0428,
    capacity: "700+ units available",
    email: "bloodbank@medanta.org",
  },
  {
    id: "bb10",
    name: "Lions Blood Bank",
    address: "Sion Hospital Campus, Mumbai, MH 400022",
    phone: "+91 22 2407 6381",
    hours: "9 AM - 5 PM",
    bloodTypes: ["A+", "B+", "O+", "AB+"],
    lat: 19.0408,
    lng: 72.8626,
    capacity: "250+ units available",
    email: "lionsbloodbank@gmail.com",
  },
];

export const getBloodBankById = (id: string): BloodBank | undefined => {
  return bloodBanks.find((bank) => bank.id === id);
};