export interface App {
    store: {
        catalog: Catalog[]
        cart: {
            product: Product
            quantity: number
        }[]
    }
    router: {
        init: () => void
        go: (route: string, addToHistory?: boolean) => void
    }
}

export type Catalog = {
    name: string
    products: Product[]
}

export type Product = {
    id: number
    name: string
    price: number
    description: string
    image: string
}
