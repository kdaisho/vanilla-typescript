export async function loadCSS(styleElement, url) {
    const res = await fetch(url);
    const css = await res.text();
    styleElement.textContent = css;
}
