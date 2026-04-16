import { FaCircle } from "react-icons/fa";
import type { PriceRange, Schedule } from "../types/restaurant";
import StarRating from "./StarRating";

interface RestaurantCardProps {
    name: string;
    rating: number;
    imageUrl: string;
    category: string;
    schedule: Schedule;
    priceRange: PriceRange
}

type PriceCategory = "$" | "$$" | "$$$" | "$$$$"

function hhmmToMillis(timeString: string): number {
    const [hours, minutes] = timeString.split(":").map(Number);
    const hoursInMillis = hours * 60 * 60 * 1000;
    const minutesInMillis = minutes * 60 * 1000;

    return hoursInMillis + minutesInMillis;

}

function getPriceCategory(range: PriceRange): PriceCategory {
  const { min, max } = range;

  if (min < 0 || max < 0 || max < min) {
    throw new Error("Invalid price range");
  }

  const midpoint = (min + max) / 2;

  if (midpoint <= 30000 && max <= 50000) {
    return "$";
  }

  if (midpoint <= 75000 && max <= 120000) {
    return "$$";
  }

  if (midpoint <= 150000 || max <= 250000) {
    return "$$$";
  }

  return "$$$$";
}

function RestaurantCard({ name, rating, imageUrl, category, schedule, priceRange }: RestaurantCardProps) {
    const isOpen = () => {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
        const currentTime = hhmmToMillis(currentDate.toTimeString().slice(0, 5))

        if (schedule[currentDay]) {
            const { open, close } = schedule[currentDay];
            return currentTime >= hhmmToMillis(open) && currentTime <= hhmmToMillis(close);
        }

        return false;
    }

    return (
        <div className="restaurant-card">
            <div className="restaurant-card-image">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="restaurant-card-body">
                <h2>{name}</h2>
                <StarRating rating={rating} />
                
            </div>
            <div className="restaurant-card-footer">
                <div>
                    <span>{category}</span>
                    <span> - </span>
                    <span>{getPriceCategory(priceRange)}</span>
                </div>
                <div className="restaurant-card-status">
                    <FaCircle fill={isOpen() ? "var(--success)" : "var(--danger)"} />
                    <span>{isOpen() ? "Open Now" : "Closed"}</span>
                </div>
            </div>
            <div className="restaurant-card-action">
                <button>Learn More</button>
            </div>
        </div>
    )
}

export default RestaurantCard