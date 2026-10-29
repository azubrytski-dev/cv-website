/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cv/design-system'],
  serverExternalPackages: ['pdfkit'],
  outputFileTracingIncludes: { '/api/cv': ['./public/fonts/*.ttf'] },
};

export default nextConfig;
