import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.proactiveequities.app',
    appName: 'Proactive Equities',
    webDir: 'out',
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
