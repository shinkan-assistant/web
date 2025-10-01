export default function StatusBadge({ status, disabled }) {
  // 状態ごとのクラス名をオブジェクトにまとめる
  const borderClasses = {
    enabled: "border-gray-300",
    disabled: "border-gray-200",
  };
  // 適切なクラス名を選択
  const borderColorClassName = !disabled ? borderClasses.enabled : borderClasses.disabled;

  return (
    <div
      className={`inline-flex items-center border bg-white ${borderColorClassName} text-xs font-semibold px-2.5 py-0.5 rounded-full`}
    >
      {status.title}
    </div>
  );
}