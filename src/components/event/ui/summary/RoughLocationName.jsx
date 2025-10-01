import { LocationIcon } from "@/helpers/bases/ui/icons";
import InfoSection from "@/helpers/bases/ui/infoSection";
import TextInfo from "@/helpers/bases/ui/infoSection/TextInfo";

export default function RoughLocationName({roughLocationName, disabled, size}) {
  return (
    <InfoSection
      Icon={LocationIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="場所"
        value={roughLocationName ?? "オンライン開催"}
      />
    </InfoSection>
  );
}