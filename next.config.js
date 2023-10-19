/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa')({})


const nextConfig = {
    images: {
        domains: ['localhost', 'demo.cloud.gooddata.com'],
    },
    // ...withPWA({
    //     dest: "public",
    //     register: true,
    //     skipWaiting: true
    // })
}

module.exports = nextConfig
