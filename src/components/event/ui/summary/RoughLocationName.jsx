import { LocationIcon } from "@/components/base/ui/components/icons";
import InfoSection from "@/components/base/ui/components/infoSection";
import TextInfo from "@/components/base/ui/components/infoSection/TextInfo";

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