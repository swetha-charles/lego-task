module.exports = {
  apps: [
    {
      name: 'app-shop',
      cwd: 'packages/app-shop',
      script: 'yarn dev',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'graphql-gateway',
      cwd: 'packages/graphql-gateway',
      script: 'yarn dev',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
        SERVICE_PRODUCTS_URL: 'http://localhost:4010'

      },
    },
    {
      name: 'service-products',
      cwd: 'packages/service-products',
      script: 'yarn dev',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
