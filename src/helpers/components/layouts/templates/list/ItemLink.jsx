import Link from "next/link";

export default function ItemLink({link}) {
  return (
    <Link 
      href={link.href}
      className="block text-center w-full bg-sky-600 text-white py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 font-medium text-lg"
    >
      {link.text}
    </Link>
  );
}
