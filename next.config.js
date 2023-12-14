/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;