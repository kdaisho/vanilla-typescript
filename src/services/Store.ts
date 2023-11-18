const Store: {
    catalog: null | Record<string, unknown>
    cart: Record<string, unknown>[]
} = {
    catalog: null,
    cart: [],
}

const ProxyStore = new Proxy(Store, {
    set(target: typeof Store, prop: keyof typeof Store, value: unknown) {
        if (prop === 'catalog') {
            target[prop] = value as Record<string, unknown>
            window.dispatchEvent(new Event('catalogupdate'))
        }
        if (prop === 'cart') {
            target[prop].push(value as Record<string, unknown>)
            window.dispatchEvent(new Event('cartupdate'))
        }
        return true
    },
})

export default ProxyStore
