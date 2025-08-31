import Link from "next/link";

export class ItemLinkInfo {
  #hrefFunc;
  #text;

  constructor({hrefFunc, text}) {
    this.#hrefFunc = hrefFunc;
    this.#text = text;
  }

  getItem({record}) {
    return {
      href: this.#hrefFunc({id: record["id"]}),
      text: this.#text,
    }
  }
}

export default function ItemLink({info}) {
  return (
    <Link 
      href={info.itemLink.href}
      className="block text-center w-full bg-sky-600 text-white py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 font-medium text-lg"
    >
      {info.itemLink.text}
    </Link>
  );
}
