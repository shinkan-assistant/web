import { LocationIcon } from "@/helpers/components/ui/icons";
import TextInfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/textInfo";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";

export default function RoughLocationName({roughLocationName}) {
  return (
    <TextInfoArea
      Icon={LocationIcon}
      size={uiSizeEnum.LG}
    >
      <TextInfo 
        label="場所"
        value={roughLocationName ?? "オンライン開催"}
      />
    </TextInfoArea>
  );
}