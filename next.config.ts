import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Terapkan cache super agresif untuk semua file di dalam folder frame & image
        source: "/frame/:path*",
        headers: [
          {
            key: "Cache-Control",
            // public: boleh di-cache oleh Vercel CDN dan Browser
            // max-age=31536000: Simpan selama 1 tahun (365 hari)
            // immutable: File ini tidak akan dirubah (karena berupa frame statis), abaikan check up ke server
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
