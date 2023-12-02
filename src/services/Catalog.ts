import API from './API.js'

export async function loadData() {
    window.app.store.catalog = await API.fetchCatalog()
}

export async function getProductById(id: number) {
    if (!window.app.store.catalog.length) {
        await loadData()
    }

    for (const catalog of window.app.store.catalog!) {
        for (const product of catalog.products) {
            if (product.id === id) {
                return product
            }
        }
    }

    return null
}
