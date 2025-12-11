import { memo } from "react";
import { MapPin, Phone, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface LocationCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  type: string;
  typeIcon: LucideIcon;
  typeColor: string;
  materials: string[];
  index: number;
}

export const LocationCard = memo(({
  id,
  name,
  address,
  phone,
  hours,
  type,
  typeIcon: TypeIcon,
  typeColor,
  materials,
  index,
}: LocationCardProps) => {
  return (
    <div
      className="group relative bg-card rounded-2xl shadow-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-200 will-change-transform hover:-translate-y-1"
      style={{ 
        animationDelay: `${Math.min(index * 50, 300)}ms`,
        animation: 'fadeSlideIn 0.3s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Type Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${typeColor} flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-105`}>
        <TypeIcon className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{type}</span>
      </div>

      {/* Active indicator */}
      <div className="absolute top-4 left-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
      </div>

      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-semibold text-foreground mb-4 pr-24 group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>

        {/* Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-sm text-muted-foreground line-clamp-2">{address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">{hours}</span>
          </div>
        </div>

        {/* Materials - show max 3 */}
        <div className="flex flex-wrap gap-2 mb-5">
          {materials.slice(0, 3).map((material) => (
            <span
              key={material}
              className="px-2.5 py-1 text-xs font-medium bg-eco-sand text-foreground rounded-md"
            >
              {material}
            </span>
          ))}
          {materials.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md">
              +{materials.length - 3} more
            </span>
          )}
        </div>

        {/* Action */}
        <Link to={`/location/${id}`}>
          <Button variant="outline" size="sm" className="w-full group/btn overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              View Details
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
});