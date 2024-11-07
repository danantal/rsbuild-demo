import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { dependencies }  from './package.json';

export default defineConfig({
  server: {
    base: '/foo',
    port: 3001,
  },
  plugins: [pluginReact(), pluginModuleFederation({
    name: 'remote',
     exposes: {
       './Button': './src/Button',
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
