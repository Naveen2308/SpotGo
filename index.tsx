import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Polyfill require for Metro
declare const require: {
    context: (path: string) => any;
};

// Must be exported or Fast Refresh won't update the context
export function App() {
    // @ts-ignore
    const ctx = require.context('./src/app');
    return <ExpoRoot context={ ctx } />;
}

registerRootComponent(App);
