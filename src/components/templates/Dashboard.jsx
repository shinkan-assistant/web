import NavMenu from "@/components/common/NavMenu";

export default function DashboardFrame({ children }) {
  return (
    <>
      <NavMenu />
      {children}
    </>
  );
}
