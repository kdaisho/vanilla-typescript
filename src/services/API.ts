const API = {
    url: '/data/catalog.json',
    fetchCatalog: async () => {
        const res = await fetch(API.url)
        return await res.json()
    },
}

export default API
