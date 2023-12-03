export async function loadCSS(
    styleElement: HTMLStyleElement,
    ...urls: string[]
) {
    for (const url of urls) {
        const response = await fetch(url)
        styleElement.textContent += await response.text()
    }
}
