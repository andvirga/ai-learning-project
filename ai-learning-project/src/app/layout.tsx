import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Learning Project",
  description: "This is a AI project for discovery and learning purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
