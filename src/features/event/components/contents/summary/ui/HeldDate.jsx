import { formatDate } from "@/helpers/utils/dateTime";
import { DateIcon } from "@/helpers/components/ui/icons";
import TextInfo from "@/helpers/components/ui/textInfo";
import TextInfoArea from "@/helpers/components/ui/infoArea";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";

export default function HeldDate({event}) {
  return (
    <TextInfoArea
      Icon={DateIcon}
      size={uiSizeEnum.LG}
    >
      <TextInfo 
        label="開催日"
        value={formatDate(event["schedules"][0]["time_range"]["start_at"])}
      />
    </TextInfoArea>
  );
}
