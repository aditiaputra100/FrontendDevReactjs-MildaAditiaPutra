import {fakerID_ID as faker} from '@faker-js/faker'
import type { Product, Restaurant } from "../types/restaurant"

faker.seed(48)

export const generateMockRestaurants = (count: number): Restaurant[] => {
    return Array.from({length: count}, () => ({
        id: faker.string.ulid(),
        name: faker.company.name(),
        category: faker.helpers.arrayElement(['Fine Dining', 'Casual Dining', 'Fast Food', 'Cafe', 'Buffet']),
        rating: faker.number.float({min: 1, max: 5, fractionDigits: 1}),
        priceRange: {
            min: faker.number.int({min: 10000, max: 50000}),
            max: faker.number.int({min: 51000, max: 200000})
        },
        schedule: {
            Monday: { open: '10:00', close: '22:00' },
            Tuesday: { open: '10:00', close: '22:00' },
            Wednesday: { open: '10:00', close: '22:00' },
            Thursday: { open: '10:00', close: '22:00' },
            Friday: { open: '10:00', close: '23:00' },
            Saturday: { open: '11:00', close: '23:00' },
            Sunday: { open: '11:00', close: '21:00' }
        },
        imageUrl: faker.image.urlLoremFlickr({category: 'food', width: 640, height: 480})
    }))
}

export const generateMockProducts = (count: number, minPrice: number, maxPrice: number): Product[] => {
    return Array.from({length: count}, () => ({
        id: faker.string.ulid(),
        name: faker.commerce.productName(),
        map: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude()
        },
        rating: faker.number.float({min: 1, max: 5, fractionDigits: 1}),
        description: faker.commerce.productDescription(),
        price: faker.number.int({min: minPrice, max: maxPrice}),
        imageUrl: faker.image.urlLoremFlickr({category: 'food', width: 640, height: 480})
    }))
}