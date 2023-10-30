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
            Router.go(event.state.route, false);
        });
        Router.go(location.pathname, false);
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch (route) {
            case '/':
                pageElement = document.createElement('catalog-page');
                break;
            case '/cart':
                pageElement = document.createElement('order-page');
                pageElement.textContent = 'Cart';
                break;
            default:
                pageElement = document.createElement('details-page');
                pageElement.textContent = 'Details';
                const paramId = route.substring(route.lastIndexOf('/') + 1);
                console.log('==> P_ID', paramId);
                pageElement.dataset.id = paramId;
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
