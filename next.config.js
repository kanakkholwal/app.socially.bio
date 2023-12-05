/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    crossOrigin: 'anonymous',
    images: {
    domains: ['res.cloudinary.com',"global-uploads.webflow.com" ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: "**",
    //   },
    // ],
},

});


module.exports = nextConfig;
