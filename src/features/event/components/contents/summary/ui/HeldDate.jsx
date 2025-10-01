import { formatDate } from "@/helpers/utils/dateTime";
import { DateIcon } from "@/helpers/components/ui/icons";
import TextInfo from "@/helpers/components/ui/info/text";
import InfoArea from "@/helpers/components/ui/infoArea";

export default function HeldDate({schedules, disabled, size}) {
  return (
    <InfoArea
      Icon={DateIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="開催日"
        value={formatDate(schedules[0]["time_range"]["start_at"])}
      />
    </InfoArea>
  );
}
