import API from './API.js'

export async function loadData() {
    window.app.store.catalog = await API.fetchCatalog()
}
