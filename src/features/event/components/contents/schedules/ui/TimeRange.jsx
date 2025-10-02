import { formatTime } from "@/helpers/utils/dateTime";
import { TimeIcon } from "@/helpers/components/ui/icons";
import TextInfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/textInfo";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";

export default function TimeRange({timeRange, disabled}) {
  const existsEndAt = !!timeRange.end_at;
  
  return (
    <TextInfoArea
      Icon={TimeIcon}
      disabled={disabled}
      size={uiSizeEnum.MD}
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
    </TextInfoArea>
  );
}
