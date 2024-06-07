/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com', 
            }
        ]
    }
};

export default nextConfig;
