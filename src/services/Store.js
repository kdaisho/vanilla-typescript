const Store = {
    catalog: null,
    cart: [],
};
const ProxyStore = new Proxy(Store, {
    set(target, prop, value) {
        if (prop === 'catalog') {
            target[prop] = value;
            window.dispatchEvent(new Event('catalogupdate'));
        }
        if (prop === 'cart') {
            target[prop].push(value);
            window.dispatchEvent(new Event('cartupdate'));
        }
        return true;
    },
});
export default ProxyStore;
