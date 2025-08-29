import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ServiceType = "INTERIEUR" | "EXTERIEUR" | "POLISH" | "MAISON";

interface ServiceCardProps {
  id: string;
  title: string;
  price: number;
  durationMin: number;
  type: ServiceType;
  selected: boolean;
  onSelect: () => void;
}

function formatDuration(min: number) {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  if (hours && minutes) {
    return `${hours} h ${minutes} min`;
  }
  if (hours) {
    return `${hours} h`;
  }
  return `${minutes} min`;
}

export function ServiceCard({ title, price, durationMin, selected, onSelect }: ServiceCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "p-4 cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 transition-colors",
        selected && "border-[#D4AF37]"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-medium">{title}</h3>
        <span className="text-[#D4AF37] font-semibold">{price} €</span>
      </div>
      <div className="text-right text-white/70 text-sm">{formatDuration(durationMin)}</div>
    </Card>
  );
}

export default ServiceCard;

