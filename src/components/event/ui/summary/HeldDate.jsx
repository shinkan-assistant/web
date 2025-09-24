import { formatDate } from "@/components/base/utils/dateTime";
import { DateIcon } from "@/components/base/ui/components/icons";
import InfoSection from "@/components/base/ui/components/infoSection";
import TextInfo from "@/components/base/ui/components/infoSection/TextInfo";

export default function HeldDate({schedules, disabled, size}) {
  return (
    <InfoSection
      Icon={DateIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="開催日"
        value={formatDate(schedules[0]["time_range"]["start_at"])}
      />
    </InfoSection>
  );
}
