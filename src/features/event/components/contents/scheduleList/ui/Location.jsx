import BlankLink from "@/helpers/components/ui/blankLink";
import { LocationIcon } from "@/helpers/components/ui/icons";
import InfoArea from "@/helpers/components/ui/infoArea";
import TextInfo from "@/helpers/components/ui/info/text";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";

export default function DetailedLocation({location, disabled, size}) {
  let blankLinkSize;
  blankLinkSize = {
    [uiSizeEnum.LG]: uiSizeEnum.MD,
    [uiSizeEnum.MD]: uiSizeEnum.SM,
  }[size];

  return (
    <InfoArea
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
    </InfoArea>
  );
}
