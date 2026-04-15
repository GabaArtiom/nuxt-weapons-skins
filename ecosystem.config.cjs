module.exports = {
  apps: [
    {
      name: 'cs.umervtilte.lol',
      script: '.output/server/index.mjs',
      cwd: '/var/www/cs.umervtilte.lol',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
}
