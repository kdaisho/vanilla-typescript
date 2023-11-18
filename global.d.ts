import { App } from './src/types.ts'

export {}

declare global {
    interface Window {
        app: App
    }
}
