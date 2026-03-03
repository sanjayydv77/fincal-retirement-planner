import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Retirement Planning Calculator | HDFC Mutual Fund",
  description: "Plan your retirement with HDFC Mutual Fund's comprehensive retirement planning calculator. Calculate your retirement corpus and monthly savings requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <header className="bg-hdfcBlue text-white py-4 px-6 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold">HDFC Mutual Fund</h1>
            <p className="text-sm mt-1">Retirement Planning Calculator</p>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200 py-6 px-6 mt-12">
          <div className="container mx-auto">
            <p className="text-sm text-hdfcGrey leading-relaxed max-w-4xl">
              This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
