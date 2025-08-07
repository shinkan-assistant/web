import _ProtectedLayout from "@/client/components/layout/app/Protected";

export default function ProtectedLayout ({ children }) {
  return (
    <_ProtectedLayout>
      {children}
    </_ProtectedLayout>
  )
}
