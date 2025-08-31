import Link from 'next/link';

function SubNavLink({info}) {
  return (
    <Link
      href={info.href}
      className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    >
      {info.text}
    </Link>
  );
}

export default function SubNavMenu({ infos }) {
  return (
    <div className="flex justify-start items-center gap-x-4">
      {infos.map((info, index) => (
        <SubNavLink key={index} info={info} />
      ))}
    </div>
  );
}


