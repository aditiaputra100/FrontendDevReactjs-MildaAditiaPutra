import {fakerID_ID as faker} from '@faker-js/faker'
import type { Product, Restaurant, Schedule } from "../types/restaurant"

faker.seed(48)

function generateSchedule(): Schedule {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const schedule: Schedule = {}

    for (const day of days) {
        const isWeekend = day === 'Saturday' || day === 'Sunday'

        // Generate opening time
        if (isWeekend) {
            // Weekend: 09:00 - 12:00
            const openSlot = faker.number.int({ min: 0, max: 6 })
            const openHour = 9 + Math.floor(openSlot / 2)
            const openMinute = (openSlot % 2) * 30
            var open = `${String(openHour).padStart(2, '0')}:${String(openMinute).padStart(2, '0')}`
        } else {
            // Weekday: 07:00 - 11:00
            const openSlot = faker.number.int({ min: 0, max: 8 })
            const openHour = 7 + Math.floor(openSlot / 2)
            const openMinute = (openSlot % 2) * 30
            var open = `${String(openHour).padStart(2, '0')}:${String(openMinute).padStart(2, '0')}`
        }

        // Generate closing time
        if (isWeekend) {
            // Weekend: 20:00 - 22:00
            const closeSlot = faker.number.int({ min: 0, max: 4 })
            const closeHour = 20 + Math.floor(closeSlot / 2)
            const closeMinute = (closeSlot % 2) * 30
            var close = `${String(closeHour).padStart(2, '0')}:${String(closeMinute).padStart(2, '0')}`
        } else {
            // Weekday: 20:00 - 23:30
            const closeSlot = faker.number.int({ min: 0, max: 7 })
            const closeHour = 20 + Math.floor(closeSlot / 2)
            const closeMinute = (closeSlot % 2) * 30
            var close = `${String(closeHour).padStart(2, '0')}:${String(closeMinute).padStart(2, '0')}`
        }

        schedule[day] = { open, close }
    }

    return schedule
}

export const generateMockRestaurants = (count: number): Restaurant[] => {
    return Array.from({length: count}, () => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        category: faker.helpers.arrayElement(['Fine Dining', 'Casual Dining', 'Fast Food', 'Cafe', 'Buffet']),
        rating: faker.number.float({min: 1, max: 5, fractionDigits: 1}),
        priceRange: {
            min: faker.number.int({min: 10000, max: 50000}),
            max: faker.number.int({min: 51000, max: 200000})
        },
        schedule: generateSchedule(),
        imageUrl: faker.image.urlLoremFlickr({category: 'food', width: 640, height: 480}),
        location: {
            lat: faker.location.latitude({ min: -8.5, max: -6.0 }),
            lng: faker.location.longitude({ min: 106.0, max: 112.0 })
        }
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
        imageUrls: Array.from(
            { length: faker.number.int({ min: 1, max: 3 }) },
            () => faker.image.urlLoremFlickr({ category: 'food', width: 640, height: 480 })
        )
    }))
}