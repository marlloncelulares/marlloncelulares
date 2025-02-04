/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Lista de domínios permitidos
    domains: [
      'www.facebook.com',
      'marlloncelulares.com.br',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
    // Adicionando suporte a padrões remotos opcionais
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
