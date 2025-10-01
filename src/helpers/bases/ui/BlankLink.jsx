import Link from "next/link";
import uiSizeEnum from "./const/enums/uiSize";

export default function BlankLink({ href, disabled, size, children }) {
  const paddingClassName = {
    [uiSizeEnum.LG]: "px-3 py-2",
    [uiSizeEnum.MD]: "px-2 py-1",
    [uiSizeEnum.SM]: "px-1 py-[2px]",
  }[size];

  // 無効状態に応じて異なるクラス名を適用
  const linkMetaClassNames = !disabled
    ? "bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-md" // 通常時のスタイル
    : "bg-sky-200 cursor-not-allowed"; // 無効時のスタイル

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center text-white font-semibold rounded-md ${paddingClassName} ${linkMetaClassNames}`}
    >
      {children}
    </Link>
  );
}
