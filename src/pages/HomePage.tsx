import { useEffect, useState } from "react"
import { fetchRestaurants } from "../services/restaurant"
import HeaderHomePage from "../components/HeaderHomePage"
import './HomePage.css'
import RestaurantCard from "../components/RestaurantCard"
import type { Restaurant } from "../types/restaurant"

function HomePage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        async function getRestaurants() {
            try {
                const restaurants = await fetchRestaurants()
                
                setRestaurants(restaurants)
            } catch (error) {
                console.error("Failed to fetch restaurants:", error)
            }
        }

        getRestaurants()
    }, [])

    return (
        <main>
            <HeaderHomePage />

            <section className="restaurants">
                <h2>All restaurants</h2>

                <div className="restaurant-items">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            rating={restaurant.rating}
                            imageUrl={restaurant.imageUrl}
                            category={restaurant.category}
                            schedule={restaurant.schedule}
                            priceRange={restaurant.priceRange}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HomePage