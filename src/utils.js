export async function loadCSS(styleElement, ...urls) {
    for (const url of urls) {
        const response = await fetch(url);
        styleElement.textContent += await response.text();
    }
}
