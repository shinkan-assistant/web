import BlankLink from "@/helpers/components/ui/blankLink";
import TextInfoArea, {TextInfo} from "@/helpers/components/ui/textInfoArea";
import uiSizeEnum from "@/helpers/components/ui/base/config/sizeEnum";
import LocationIcon from "@/helpers/components/ui/icons/location";

export default function Location({location, disabled}) {
  return (
    <TextInfoArea
      Icon={LocationIcon}
      disabled={disabled}
      size={uiSizeEnum.MD}
    >
      <TextInfo 
        label="場所"
        value={location?.["name"] ?? "オンライン開催"}
      />
  
      {location["address"] && 
        <TextInfo 
          label="住所" 
          value={location["address"]} 
        />
      }
  
      {location["map_url"] && (
        <div className="mt-1 mb-[6px]">
          <BlankLink 
            href={location["map_url"]} 
            disabled={disabled}
            size={uiSizeEnum.SM}
          >  
            地図を見る
          </BlankLink>
        </div>
      )}
    </TextInfoArea>
  );
}
