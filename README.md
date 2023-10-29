## Vanilla TypeScript Single-Page Application

### Custom Routing: common pitfalls and solutions

I built a custom routing system which seemed to function well initially. However, I encountered an issue when navigating to the `/cart` page and refreshing it, causing the app to crash with the error: `Cannot GET /cart`, accompanied by a 404 response from the server.

Since this project doesn't involve server-side operations and aims to showcase the possibility of building a minimal viable product (MVP) without relying on frameworks like React or Svelte, setting up a server isn't an option. This issue became particularly cumbersome while using the Live Server extension in VSCode, which auto-refreshes the page upon saving files, requiring manual navigation back to the intended page post a 404 error.

Though hash routing (e.g., `/#cart`) is a common workaround for SPAs to prevent server requests on refresh, it isn't a preferred solution for me.

#### Enabling Index.html Forwarding

Luckily, the Live Server extension allows for a configuration to always serve the `index.html` file regardless of the route, effectively solving the refresh issue:

1. **Access VSCode Settings**:

    - Open the settings in VSCode.
    - In the search bar, type `liveserver` or navigate to the "Live Server Config" menu.

2. **Update Live Server Settings**:

    - Locate "Live Server > Settings: File" and specify your main file (for me, it's `index.html`).

3. **Restart Live Server**:
    - Restart the Live Server to apply the changes.

Now, irrespective of the route, Live Server will always serve the `index.html` file, ensuring your SPA remains functional on refresh.

It might be beneficial to configure a custom 404 page for unmatched routes, as this setup bypasses the typical 404 responses, even for nonexistent routes.
