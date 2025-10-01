import InfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/info/text";
import FeeTypeEnum from "../../../../../../backend/data/enums/event/feeType";
import { FeeIcon } from "@/helpers/components/ui/icons";

export default function Fee({feesByBelong, belong, editFormHook, disabled, size}) {
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
    <InfoArea
      Icon={FeeIcon}
      disabled={disabled}
      size={size}
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
    </InfoArea>
  );
}
