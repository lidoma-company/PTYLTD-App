export const setupMocks = async () => {
    if (typeof window !== 'undefined') {
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'warn',
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
        });
    } else {
        const { worker } = await import('./server');
        worker.listen();
    }
};
