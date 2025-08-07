import _UnprotectedLayout from "@/client/components/layout/Unprotected";

export default function UnprotectedLayout ({ children }) {
  return (
    <_UnprotectedLayout>
      {children}
    </_UnprotectedLayout>
  )
}
