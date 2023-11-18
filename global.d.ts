import { App } from './src/types'

export {}

declare global {
    interface Window {
        app: App
    }
}
