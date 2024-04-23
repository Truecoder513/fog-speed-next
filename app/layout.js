import { Inter } from "next/font/google";
import "./globals.scss";
import "react-phone-number-input/style.css";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "sonner";
import { ModalProvider } from "@/context/modalContext";
import ModalContainer from "@/components/Modal/ModalContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Speed Dating FOG",
  description: "Truecoder513",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <AuthProvider>
            {children}
            <ModalContainer />
            <Toaster richColors={true} />
          </AuthProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
