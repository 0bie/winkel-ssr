export const registerServiceWorker = (url) => {
    return Promise.resolve().then(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(url)
                .then((registration) => {
                    console.log(`ServiceWorker registration successful with scope: ${registration.scope}`)
                }).catch((error) => {
                    console.log('ServiceWorker registration failed: ', error)
                })
        }
    })
}
