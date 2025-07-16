import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.backery.superapp',
  appName: 'blockbakery-superapp',
  webDir: 'mobile-dist',
  server: {
    url: 'https://blockbackey.vercel.app',
    cleartext: true
  }
};

export default config;