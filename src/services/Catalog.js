import API from './API.js';
export async function loadData() {
    window.app.store.catalog = await API.fetchCatalog();
}
export async function getProductById(id) {
    if (window.app.store.catalog === null) {
        await loadData();
    }
    for (const catalog of window.app.store.catalog) {
        for (const product of catalog.products) {
            if (product.id === parseInt(id, 10)) {
                return product;
            }
        }
    }
    return null;
}
