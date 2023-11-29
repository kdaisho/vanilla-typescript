import { getProductById } from './Catalog.js';
export async function addToCart(productId) {
    const product = await getProductById(productId);
    const itemInTheCart = window.app.store.cart.filter(item => {
        return item.product.id === productId;
    });
    if (itemInTheCart.length === 1) {
        window.app.store.cart = window.app.store.cart.map((item) => {
            return item.product.id === productId
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                }
                : item;
        });
    }
    else {
        window.app.store.cart = [
            ...window.app.store.cart,
            {
                product: product,
                quantity: 1,
            },
        ];
    }
}
