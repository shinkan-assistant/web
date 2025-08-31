import { ContentTypeEnum } from "../../../const/enums/type";

export default function ContentTitleArea({contentType, title, subTitle}) {
  const containerAdditionalClassName = {
    [ContentTypeEnum.list]: "font-bold truncate",
    [ContentTypeEnum.item]: "font-extrabold",
  }[contentType];
  const titleTextSizeClassName = {
    [ContentTypeEnum.list]: "text-2xl",
    [ContentTypeEnum.item]: "text-3xl sm:text-4xl",
  }[contentType];

  return (
    <h1 className={`text-gray-900 flex flex-col gap-y-4 ${containerAdditionalClassName}`}>
      <div className={titleTextSizeClassName}>{title}</div>
      {subTitle && <div className="text-xl sm:text-2xl">{subTitle}</div>}
    </h1>
  );
}
