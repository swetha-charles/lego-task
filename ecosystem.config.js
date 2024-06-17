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
        SERVICE_CHARACTERS_URL: 'http://localhost:4020'
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
    {
      name: 'service-characters',
      cwd: 'packages/service-characters',
      script: 'yarn dev',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
