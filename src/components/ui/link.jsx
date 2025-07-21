import Link from "next/link";

export function BlankLink({href, paddingClassName, children}) {
  return (
    <Link
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`inline-flex items-center justify-center ${paddingClassName} bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition-colors duration-200 shadow-md`}
    >
      {children}
    </Link>
  );
}