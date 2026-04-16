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
    id?: string
    name: string
    map: {
        lat: number
        lng: number
    }
    price: number
    imageUrls: string[]
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
    location: {
        lat: number
        lng: number
    }
}

export interface RestaurantWithProducts extends Restaurant {
    products: Product[] | null
}