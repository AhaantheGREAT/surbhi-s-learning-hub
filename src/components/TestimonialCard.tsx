import { Star } from "lucide-react";

interface Props {
  name: string;
  text: string;
  course: string;
  rating: number;
}

const TestimonialCard = ({ name, text, course, rating }: Props) => (
  <div className="rounded-lg bg-card p-6 shadow-card">
    <div className="flex gap-1 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={16} className="fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground italic">"{text}"</p>
    <div className="mt-4 border-t border-border pt-3">
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{course}</p>
    </div>
  </div>
);

export default TestimonialCard;
