import { formatTime } from "@/helpers/utils/dateTime";
import { TimeIcon } from "@/helpers/bases/ui/icons";
import InfoSection from "@/helpers/bases/ui/infoSection";
import TextInfo from "@/helpers/bases/ui/infoSection/TextInfo";

export default function TimeRange({timeRange, disabled, size}) {
  const existsEndAt = !!timeRange.end_at;
  
  return (
    <InfoSection
      Icon={TimeIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="開始"
        value={formatTime(timeRange["start_at"])}
      />

      {existsEndAt &&
        <TextInfo 
          label="終了"
          value={formatTime(timeRange["end_at"])}
        />
      }
    </InfoSection>
  );
}
