const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    },
};

module.exports = nextConfig;
