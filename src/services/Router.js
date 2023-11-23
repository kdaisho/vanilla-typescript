const Router = {
    init: () => {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const target = event.target;
                Router.go(target.getAttribute('href') || '/');
            });
        });
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                Router.go(event.state.route, false);
                return;
            }
            // TODO: render 404 page
        });
        Router.go(location.pathname + location.hash, false);
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch (true) {
            case '/' === route:
                pageElement = document.createElement('catalog-page');
                break;
            case '/#/cart' === route:
                pageElement = document.createElement('order-page');
                pageElement.textContent = 'Cart';
                break;
            case route.startsWith('/#/product/'):
                pageElement = document.createElement('details-page');
                pageElement.textContent = 'Details';
                pageElement.dataset.id = route.substring(route.lastIndexOf('/') + 1);
                break;
            default:
                console.log('404');
                break;
        }
        if (!pageElement) {
            return; // maybe render 404 page
        }
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = '';
            mainElement.appendChild(pageElement);
            window.scrollTo(0, 0);
        }
    },
};
export default Router;
