import { formatDate } from "@/helpers/utils/dateTime";
import TextInfoArea, {TextInfo} from "@/helpers/components/ui/textInfoArea";
import uiSizeEnum from "@/helpers/components/ui/base/config/sizeEnum";
import DateIcon from "@/helpers/components/ui/icons/date";

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
