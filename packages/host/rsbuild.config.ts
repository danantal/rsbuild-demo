import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies }  from './package.json';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    base: '/',
    port: 3000,
  },
  moduleFederation: {
    options: {
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3001/foo/remoteEntry.js',
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
    },

  },
  tools: {
    rspack: (config) => {
      console.log('rspack config output:', config.output);
      return config;
    }
  }
});
