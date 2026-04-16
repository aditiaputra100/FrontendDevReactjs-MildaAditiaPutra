import { useState } from "react"
import StarRating from "./StarRating"
import './ProductCard.css'

interface ProductCardProps {
    name: string
    rating: number
    description: string
    price: number
    imageUrls: string[]
}

function ProductCard({ name, rating, description, price, imageUrls }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    function handlePrevImage() {
        setCurrentImageIndex((prev) =>
            prev === 0 ? imageUrls.length - 1 : prev - 1
        )
    }

    function handleNextImage() {
        setCurrentImageIndex((prev) =>
            prev === imageUrls.length - 1 ? 0 : prev + 1
        )
    }

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)

    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src={imageUrls[currentImageIndex]} alt={name} />
                {imageUrls.length > 1 && (
                    <div className="product-card-image-nav">
                        <button onClick={handlePrevImage}>‹</button>
                        <span>{currentImageIndex + 1} / {imageUrls.length}</span>
                        <button onClick={handleNextImage}>›</button>
                    </div>
                )}
            </div>
            <div className="product-card-body">
                <h3>{name}</h3>
                <StarRating rating={rating} />
                <p className="product-card-description">{description}</p>
                <span className="product-card-price">{formattedPrice}</span>
            </div>
        </div>
    )
}

export default ProductCard
