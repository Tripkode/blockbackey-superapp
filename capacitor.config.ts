import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.backery.superapp',
  appName: 'BlockBakery',
  webDir: 'mobile-dist',
  server: {
    url: 'https://blockbackery.vercel.app',
    cleartext: true
  }
};

export default config;