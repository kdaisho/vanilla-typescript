export async function loadCSS(styleElement, url) {
    const res = await fetch(url);
    styleElement.textContent = await res.text();
}
