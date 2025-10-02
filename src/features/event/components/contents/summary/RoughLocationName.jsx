import TextInfoArea, {TextInfo} from "@/helpers/components/ui/textInfoArea";
import uiSizeEnum from "@/helpers/components/ui/base/config/sizeEnum";
import LocationIcon from "@/helpers/components/ui/icons/location";

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