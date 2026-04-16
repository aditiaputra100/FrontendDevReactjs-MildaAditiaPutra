export interface PriceRange {
    min: number
    max: number
}

export interface Schedule {
    [day: string]: {
        open: string
        close: string
    }
}

export interface Product {
    name: string
    map: {
        lat: number
        lng: number
    }
    price: number
    imageUrl: string
    rating: number
    description: string
}

export interface Restaurant {
    id: string
    name: string
    category: string
    rating: number
    priceRange: PriceRange
    schedule: Schedule
    imageUrl: string
}

export interface RestaurantWithProducts extends Restaurant {
    products: Product[] | null
}