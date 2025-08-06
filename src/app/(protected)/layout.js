import ProtectedLayout from "@/client/components/layout/Protected";

export default function ({ children }) {
  return (
    <ProtectedLayout children={children} />
  )
}
