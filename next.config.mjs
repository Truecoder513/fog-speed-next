/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    mongoAtlasUrl:
      "mongodb+srv://truecoder513:YB_QiFYwHypkiz2@cluster0.uhjicwg.mongodb.net/",
    contactMail: "truecoder513@gmail.com",
    smtpEmail: "fresnelcresusaglossi@gmail.com",
    smtpPassword: "Bbsvq3AV6MScdE0m",
    BLOB_READ_WRITE_TOKEN:
      "vercel_blob_rw_vEZwzmsZ5cpt4Hri_Tyk6iD5QG6ofgI3zExdS9qNaIJIRZi",
    jwtSecret: "dev-this-app-for-fog-speed-dating",
  },
};

export default nextConfig;
