module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Use "true" for a 308 (permanent) redirect
      },
    ];
  },
  
};