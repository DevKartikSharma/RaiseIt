/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com','images.pexels.com','randomuser.me'],
  },
  turbopack: {
    root: './', // or './video 131/raiseit' depending on where your `next.config.js` is
  },
};

export default nextConfig;
