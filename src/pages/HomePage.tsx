import { useEffect, useMemo, useState } from "react"
import { fetchRestaurants } from "../services/restaurant"
import HeaderHomePage from "../components/HeaderHomePage"
import './HomePage.css'
import RestaurantCard from "../components/RestaurantCard"
import type { Restaurant } from "../types/restaurant"

function HomePage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")

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

    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) => {

            if (isOpenFilter) {
                const now = new Date()
                const currentDay = now.toLocaleString("en-US", { weekday: "long" })
                const currentTime = now.toTimeString().slice(0, 5) // "HH:mm"
                const todaySchedule = restaurant.schedule[currentDay]

                if (!todaySchedule) return false
                if (currentTime < todaySchedule.open || currentTime > todaySchedule.close) return false
            }

            if (selectedCategory && restaurant.category.toLowerCase() !== selectedCategory) {
                return false
            }

            return true
        }).sort((a, b) => {
            const midA = (a.priceRange.max + a.priceRange.min) / 2
            const midB = (b.priceRange.max + b.priceRange.min) / 2

            if (selectedPriceRange === "min") {
                return midA - midB
            } else if (selectedPriceRange === "max") {
                return midB - midA
            } 

            return 0
        })
    }, [restaurants, isOpenFilter, selectedPriceRange, selectedCategory])

    function handleIsOpenFilter(value: boolean | null) {

        if (value === null) {
            setIsOpenFilter(false)
            return
        }

        setIsOpenFilter(value)
    }

    function handlePriceRangeChange(priceRange: string) {
        setSelectedPriceRange(priceRange)
    }

    function handleCategoryChange(category: string) {
        setSelectedCategory(category)
    }

    return (
        <main>
            <HeaderHomePage
                isOpenFilter={isOpenFilter}
                selectedPriceRange={selectedPriceRange}
                selectedCategory={selectedCategory}
                onIsOpenFilterChange={handleIsOpenFilter}
                onPriceRangeChange={handlePriceRangeChange}
                onCategoryChange={handleCategoryChange}
            />

            <section className="restaurants">
                <h2>All restaurants</h2>

                <div className="restaurant-items">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                name={restaurant.name}
                                rating={restaurant.rating}
                                imageUrl={restaurant.imageUrl}
                                category={restaurant.category}
                                schedule={restaurant.schedule}
                                priceRange={restaurant.priceRange}
                            />
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                            No restaurants found matching your filters.
                        </p>
                    )}
                </div>
            </section>
        </main>
    )
}

export default HomePage