import {http, HttpResponse} from 'msw'
import { generateMockProducts, generateMockRestaurants } from './generator'


const mockRestaurants = generateMockRestaurants(10)

const mockCategories = ['Fine Dining', 'Casual Dining', 'Fast Food', 'Cafe', 'Buffet']

export const handlers = [
    http.get('/api/restaurants', () => {
        return HttpResponse.json(mockRestaurants)
    }),

    http.get('/api/restaurants/:id', ({params}) => {
        const {id} = params
        const foundRestaurant = mockRestaurants.find(r => r.id === id)

        if (!foundRestaurant) return HttpResponse.json({error: 'Restaurant not found'}, {status: 404})

        return HttpResponse.json({
            ...foundRestaurant,
            products: generateMockProducts(5, foundRestaurant.priceRange.min, foundRestaurant.priceRange.max)
        })
    }),

    http.get('/api/categories', () => {
        return HttpResponse.json(mockCategories)
    })
]