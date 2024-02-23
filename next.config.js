const nextConfig = {
  images: {
    unoptimized: false,
    domains: [
      "production.print.mounirrouissi2.workers.dev",
      "replicate.delivery",
    ],
  },


  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // If you're using webpack 5, you no longer need to manually add these externals.
    // They are handled automatically by webpack.
    if (webpack.version.startsWith('4.')) {
      config.externals = config.externals || [];
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
