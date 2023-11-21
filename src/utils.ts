export async function loadCSS(styleElement: HTMLStyleElement, url: string) {
    const res = await fetch(url)
    styleElement.textContent = await res.text()
}
