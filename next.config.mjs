/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: false,
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://truecoder513:YB_QiFYwHypkiz2@cluster0.uhjicwg.mongodb.net/",
    contactMail: "truecoder513@gmail.com",
    smtpEmail: "fresnelcresusaglossi@gmail.com",
    smtpPassword: "Bbsvq3AV6MScdE0m",
  },
};

export default nextConfig;
