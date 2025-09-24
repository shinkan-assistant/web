import { formatTime } from "@/components/base/utils/dateTime";
import { TimeIcon } from "@/components/base/ui/components/icons";
import InfoSection from "@/components/base/ui/components/infoSection";
import TextInfo from "@/components/base/ui/components/infoSection/TextInfo";

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
