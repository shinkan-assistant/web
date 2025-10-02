import TextInfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/textInfo";
import FeeTypeEnum from "../../../../../../backend/data/enums/event/feeType";
import { FeeIcon } from "@/helpers/components/ui/icons";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";

export default function Fee({feesByBelong, belong, editFormHook, disabled}) {
  let fee;
  if (feesByBelong === undefined || feesByBelong.length === 0) {
    fee = {type: FeeTypeEnum.free};
  }
  else {
    for (let feeTmp of feesByBelong) {
      if (JSON.stringify(feeTmp["belong"]) === JSON.stringify(belong)) {
        fee = feeTmp;
        break;
      }
    }
  }

  if (!fee) {
    fee = Object.values(feesByBelong)[0];
  }

  return (
    <TextInfoArea
      Icon={FeeIcon}
      disabled={disabled}
      size={uiSizeEnum.MD}
    >
      <TextInfo
        label="参加費"
        value={fee["type"] === FeeTypeEnum.fixed ? `¥${fee["fixed"]}` : fee["type"]}
      />

      {fee.comment &&
        <TextInfo
          label="注記"
          value={fee["comment"]}
        />
      }
    </TextInfoArea>
  );
}
