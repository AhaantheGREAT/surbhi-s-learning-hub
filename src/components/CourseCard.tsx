import { Link } from "react-router-dom";
import { Course } from "@/data/courses";

const CourseCard = ({ course }: { course: Course }) => (
  <Link
    to={`/courses/${course.id}`}
    className="group block overflow-hidden rounded-lg bg-card shadow-card transition-all hover:shadow-soft hover:-translate-y-1"
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground">{course.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.shortDescription}</p>
      <p className="mt-3 text-lg font-bold text-primary">₹{course.price.toLocaleString("en-IN")}</p>
    </div>
  </Link>
);

export default CourseCard;
