import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { dependencies }  from './package.json';

export default defineConfig({
  server: {
    base: '/',
    port: 3000,
  },
  plugins: [pluginReact(), pluginModuleFederation({
    name: 'host',
    remotes: {
      remote: 'remote@http://localhost:3001/foo/mf-manifest.json',
    },
    shared: {
      ...dependencies,
      react: {
        singleton: true,
        requiredVersion: dependencies['react'],
      },
      'react-dom': {
        singleton: true,
        requiredVersion: dependencies['react-dom'],
      },
    },
  })]
});
