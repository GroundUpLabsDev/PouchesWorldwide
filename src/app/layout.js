import Header from "@/components/Header";
import "../styles/globals.css";
import { Poppins, Source_Serif_4, Inter } from "next/font/google";

// Configure Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Include the font weights you need
  variable: "--font-poppins", // Define a CSS variable for Poppins
});

// Configure Source Serif 4
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Include the font weights you need
  variable: "--font-source-serif", // Define a CSS variable for Source Serif 4
});

const inter = Inter({
  subsets: ["latin"], // Loads only the required characters
  weight: ["400", "700"], // Choose font weights
  variable: "--font-inter", // Set a CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSerif.variable}`}>
      <body className="font-poppins">
        <Header />
        {children}
      </body>
    </html>
  );
}
