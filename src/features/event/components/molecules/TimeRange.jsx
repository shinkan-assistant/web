import { formatTime } from "@/base/utils/dateTime";
import { TimeIcon } from "@/base/ui/components/icons";
import InfoSection from "@/base/ui/components/infoSection";
import TextInfo from "@/base/ui/components/infoSection/TextInfo";

export default function TimeRange({timeRange, disabled, size}) {
  const existsEndAt = !!timeRange.end_at;
  
  return (
    <InfoSection
      Icon={TimeIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo label="開始" value={formatTime(timeRange["start_at"])} isEdit={false} />

      {existsEndAt &&
        <TextInfo label="終了" value={formatTime(timeRange["end_at"])} isEdit={false} />
      }
    </InfoSection>
  );
}
