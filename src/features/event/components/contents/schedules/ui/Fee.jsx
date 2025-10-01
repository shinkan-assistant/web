import InfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/info/text";
import FeeTypeEnum from "../../../../../../backend/data/enums/event/feeType";
import { FeeIcon } from "@/helpers/components/ui/icons";

export default function Fee({feesByBelong, belong, disabled, size}) {
  let feeInfo;
  if (feesByBelong === undefined || feesByBelong.length === 0) {
    feeInfo = {type: FeeTypeEnum.free};
  }
  else {
    for (let feeInfoTmp of feesByBelong) {
      if (JSON.stringify(feeInfoTmp["belong"]) === JSON.stringify(belong)) {
        feeInfo = feeInfoTmp;
        break;
      }
    }
  }

  if (!feeInfo) {
    feeInfo = Object.values(feesByBelong)[0];
  }

  return (
    <InfoArea
      Icon={FeeIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo
        label="参加費"
        value={feeInfo["type"] === FeeTypeEnum.fixed ? `¥${feeInfo["fixed"]}` : feeInfo["type"]}
      />

      {feeInfo.comment &&
        <TextInfo
          label="注記"
          value={feeInfo["comment"]}
        />
      }
    </InfoArea>
  );
}
