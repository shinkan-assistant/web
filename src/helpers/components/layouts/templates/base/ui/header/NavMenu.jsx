import Link from 'next/link';

function SubNavLink({link}) {
  return (
    <Link
      href={link.href}
      className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    >
      {link.text}
    </Link>
  );
}

export default function SubNavMenu({links}) {
  return (
    <div className="flex justify-start items-center gap-x-4">
      {links.map((link, index) => (
        <SubNavLink key={index} link={link} />
      ))}
    </div>
  );
}


