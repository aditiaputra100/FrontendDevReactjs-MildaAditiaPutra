import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchRestaurantById } from "../services/restaurant"
import type { RestaurantWithProducts } from "../types/restaurant"
import StarRating from "../components/StarRating"
import RestaurantMap from "../components/RestaurantMap"
import ProductCard from "../components/ProductCard"
import './RestaurantDetailPage.css'

function RestaurantDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState<RestaurantWithProducts | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function getRestaurant() {
            if (!id) return
            try {
                setLoading(true)
                const data = await fetchRestaurantById(id)
                setRestaurant(data)
            } catch (err) {
                setError("Failed to load restaurant details")
            } finally {
                setLoading(false)
            }
        }
        getRestaurant()
    }, [id])

    if (loading) return <main><p>Loading...</p></main>
    if (error || !restaurant) return <main><p>{error || "Restaurant not found"}</p></main>

    return (
        <main className="restaurant-detail">
            <button className="outlined" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <section className="restaurant-detail-header">
                <h1>{restaurant.name}</h1>
                <StarRating rating={restaurant.rating} />
                <p>{restaurant.category}</p>
            </section>

            <section className="restaurant-detail-map">
                <RestaurantMap
                    lat={restaurant.location.lat}
                    lng={restaurant.location.lng}
                    name={restaurant.name}
                />
            </section>

            <section className="restaurant-detail-products">
                <h2>Products</h2>
                <div className="product-items">
                    {restaurant.products && restaurant.products.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            rating={product.rating}
                            description={product.description}
                            price={product.price}
                            imageUrls={product.imageUrls}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default RestaurantDetailPage
