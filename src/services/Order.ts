import { Product } from '../types'
import { getProductById } from './Catalog.js'

type CartItem = {
    product: Product
    quantity: number
}

export async function addToCart(productId: number) {
    const product = await getProductById(productId)

    if (!product) {
        throw new Error('Product not found')
    }

    const currentItem = window.app.store.cart.filter(item => {
        return item.product.id === productId
    })

    if (currentItem.length === 1) {
        window.app.store.cart = window.app.store.cart.map((item: CartItem) => {
            return item.product.id === productId
                ? {
                      ...item,
                      quantity: item.quantity + 1,
                  }
                : item
        })
    } else {
        window.app.store.cart = [
            ...window.app.store.cart,
            {
                product: product,
                quantity: 1,
            },
        ]
    }

    window.dispatchEvent(new Event('appcartchange'))
}

export function removeFromCart(productId: number) {
    window.app.store.cart = window.app.store.cart.filter(
        item => item.product.id !== productId
    )
}
