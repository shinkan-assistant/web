import InfoSection from "@/base/ui/components/infoSection";
import TextInfo from "@/base/ui/components/infoSection/TextInfo";
import FeeTypeEnum from "../../../const/enums/feeType";
import { FeeIcon } from "@/base/ui/components/icons";

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
    <InfoSection
      Icon={FeeIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo
        label="参加費"
        value={feeInfo["type"] === FeeTypeEnum.fixed ? `¥${feeInfo["fixed"]}` : feeInfo["type"]}
        isEdit={false}
      />

      {feeInfo.comment &&
        <TextInfo
          label="注記"
          value={feeInfo["comment"]}
          isEdit={false}
        />
      }
    </InfoSection>
  );
}
