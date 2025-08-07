import "./globals.css";
import _RootLayout from "@/server/components/layout/Root";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default function RootLayout({ children }) {
  return (
    <_RootLayout children={children} metadata={metadata} />
  )
}
