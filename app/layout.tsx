import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "Professional portfolio showcasing my projects, skills, and experience in full stack web development.",
  keywords: "portfolio, web developer, full stack developer, Next.js, React, TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
