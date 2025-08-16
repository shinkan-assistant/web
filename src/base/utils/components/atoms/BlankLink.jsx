import Link from "next/link";

export function BlankLink({href, isDisabled, paddingClassName, children}) {
  const bgColor = !isDisabled ? "bg-sky-500" : "bg-sky-200";
  return (
    <Link
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`inline-flex items-center justify-center ${paddingClassName} ${bgColor} text-white font-semibold rounded-md hover:bg-sky-600 transition-colors duration-200 shadow-md`}
    >
      {children}
    </Link>
  );
}