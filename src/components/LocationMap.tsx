import { MapPin } from "lucide-react";

interface LocationMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export const LocationMap = ({ lat, lng, name, address }: LocationMapProps) => {
  // Create a Google Maps embed URL using coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin`;
  
  // Alternative: Use a query-based embed for better marker placement
  const searchQuery = encodeURIComponent(`${name}, ${address}`);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${searchQuery}&zoom=15`;
  
  // Fallback to coordinates-based search if address lookup fails
  const fallbackUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-card border border-border">
      <iframe
        src={fallbackUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${name}`}
        className="absolute inset-0"
      />
      
      {/* Overlay gradient for styling */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      
      {/* Location label */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-border">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
      </div>
    </div>
  );
};
