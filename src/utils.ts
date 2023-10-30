export async function loadCSS(styleElement: HTMLStyleElement, url: string) {
    const res = await fetch(url)
    const css = await res.text()
    styleElement.textContent = css
}
