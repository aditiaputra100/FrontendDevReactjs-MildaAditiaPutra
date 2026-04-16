import { FaStar, FaStarHalfAlt } from "react-icons/fa"

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    return (
        <div className="star-rating">
            {Array(fullStars).fill(0).map((_, index) => (
                <FaStar key={index} fill="var(--primary)" stroke="var(--primary)" strokeWidth={5} />
            ))}
            {hasHalfStar && <FaStarHalfAlt fill="var(--primary)" strokeWidth={5} stroke="var(--primary)" />}
            {Array(emptyStars).fill(0).map((_, index) => (
                <FaStar key={index} strokeWidth={5} stroke="var(--primary)" fill="transparent" />
            ))}
        </div>
    )
}

export default StarRating