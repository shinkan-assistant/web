import "./globals.css";
import RootLayout from "@/server/components/layout/Root";

export const metadata = {
  title: "Gatherlynx",
  description: "Web Application for New Welcome",
};

export default function({ children }) {
  return (
    <RootLayout children={children} metadata={metadata} />
  )
}
