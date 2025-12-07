import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface LocationCardProps {
  id: number;
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

export const LocationCard = ({
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl shadow-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-300"
    >
      {/* Type Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${typeColor} flex items-center gap-1.5`}>
        <TypeIcon className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{type}</span>
      </div>

      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-semibold text-foreground mb-4 pr-24 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-sm text-muted-foreground">{address}</span>
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

        {/* Materials */}
        <div className="flex flex-wrap gap-2 mb-5">
          {materials.map((material) => (
            <span
              key={material}
              className="px-2.5 py-1 text-xs font-medium bg-eco-sand text-foreground rounded-md"
            >
              {material}
            </span>
          ))}
        </div>

        {/* Action */}
        <Link to={`/location/${id}`}>
          <Button variant="outline" size="sm" className="w-full group/btn">
            View Details
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};