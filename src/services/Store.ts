import { App, Product, Catalog } from '../types'

const Store: {
    catalog: App['store']['catalog']
    cart: { product: Product; quantity: number }[]
} = {
    catalog: [],
    cart: [],
}

const ProxyStore = new Proxy(Store, {
    set(target: typeof Store, prop: keyof typeof Store, value: unknown[]) {
        if (prop === 'catalog') {
            target[prop] = value as Catalog[]
            window.dispatchEvent(new Event('catalogupdate'))
        }
        if (prop === 'cart') {
            target[prop] = value as { product: Product; quantity: number }[]
            window.dispatchEvent(new Event('cartupdate'))
        }

        return true
    },
})

export default ProxyStore
