import { formatDate } from "@/helpers/utils/dateTime";
import { DateIcon } from "@/helpers/bases/ui/icons";
import InfoSection from "@/helpers/bases/ui/infoSection";
import TextInfo from "@/helpers/bases/ui/infoSection/TextInfo";

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
