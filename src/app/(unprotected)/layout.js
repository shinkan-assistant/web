import _UnprotectedLayout from "@/client/components/layout/app/Unprotected";

export default function UnprotectedLayout ({ children }) {
  return (
    <_UnprotectedLayout>
      {children}
    </_UnprotectedLayout>
  )
}
