import { LocationIcon } from "@/helpers/components/ui/icons";
import InfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/info/text";

export default function RoughLocationName({roughLocationName, disabled, size}) {
  return (
    <InfoArea
      Icon={LocationIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="場所"
        value={roughLocationName ?? "オンライン開催"}
      />
    </InfoArea>
  );
}