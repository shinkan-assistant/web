import BlankLink from "@/components/base/ui/components/BlankLink";
import { LocationIcon } from "@/components/base/ui/components/icons";
import InfoSection from "@/components/base/ui/components/infoSection";
import TextInfo from "@/components/base/ui/components/infoSection/TextInfo";
import uiSizeEnum from "@/components/base/ui/const/enums/uiSize";

export default function DetailedLocation({location, disabled, size}) {
  let blankLinkSize;
  blankLinkSize = {
    [uiSizeEnum.LG]: uiSizeEnum.MD,
    [uiSizeEnum.MD]: uiSizeEnum.SM,
  }[size];

  return (
    <InfoSection
      Icon={LocationIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="場所"
        value={location?.["name"] ?? "オンライン開催"}
      />
  
      {location.address && 
        <TextInfo 
          label="住所" 
          value={location["address"]} 
        />
      }
  
      {location.map_url && (
        <div className="mt-1 mb-[6px]">
          <BlankLink 
            href={location["map_url"]} 
            disabled={disabled}
            size={blankLinkSize}
          >  
            地図を見る
          </BlankLink>
        </div>
      )}
    </InfoSection>
  );
}
