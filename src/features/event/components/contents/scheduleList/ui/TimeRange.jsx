import { formatTime } from "@/helpers/utils/dateTime";
import { TimeIcon } from "@/helpers/components/ui/icons";
import InfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/info/text";

export default function TimeRange({timeRange, disabled, size}) {
  const existsEndAt = !!timeRange.end_at;
  
  return (
    <InfoArea
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
    </InfoArea>
  );
}
