import { LocationIcon } from "@/base/ui/components/icons";
import InfoSection from "@/base/ui/components/infoSection";
import TextInfo from "@/base/ui/components/infoSection/TextInfo";

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