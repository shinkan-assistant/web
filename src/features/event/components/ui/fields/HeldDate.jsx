import { formatDate } from "@/base/utils/dateTime";
import { DateIcon } from "@/base/ui/components/icons";
import InfoSection from "@/base/ui/components/infoSection";
import TextInfo from "@/base/ui/components/infoSection/TextInfo";

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
        isEdit={false}
      />
    </InfoSection>
  );
}
