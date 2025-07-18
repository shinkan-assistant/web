import NavMenu from "@/components/common/NavMenu";

export default function Dashboard({ children }) {
  return (
    <>
      <NavMenu />
      {children}
    </>
  );
}
