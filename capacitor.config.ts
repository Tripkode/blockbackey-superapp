import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.backery.superapp',
  appName: 'blockbakery-superapp',
  webDir: 'mobile-dist',
  server: {
    url: 'https://bt1g2pcs-3000.use2.devtunnels.mss/',
    cleartext: true
  }
};

export default config;