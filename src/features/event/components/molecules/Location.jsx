import BlankLink from "@/base/ui/components/BlankLink";
import { LocationIcon } from "@/base/ui/components/icons";
import InfoSection from "@/base/ui/components/infoSection";
import TextInfo from "@/base/ui/components/infoSection/TextInfo";
import { UI_SIZE } from "@/base/ui/const";

function LocationBase({isDetailed, location, disabled, size}) {
  let blankLinkSize;
  if (isDetailed) {
    blankLinkSize = {
      [UI_SIZE.LG]: UI_SIZE.MD,
      [UI_SIZE.MD]: UI_SIZE.SM,
    }[size];
  }

  return (
    <InfoSection
      Icon={LocationIcon}
      disabled={disabled}
      size={size}
    >
      <TextInfo 
        label="場所"
        value={location?.["name"] ?? "オンライン開催"}
        isEdit={false}
      />
  
      {isDetailed &&
        <>
          {location.address && 
            <TextInfo 
              label="住所" 
              value={location["address"]} 
              isEdit={false} 
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
        </>
      }
    </InfoSection>
  );
}

export function Location({locationName, disabled, size}) {
  return (
    <LocationBase location={{"name": locationName ?? "オンライン参加"}} disabled={disabled} size={size} />
  );
}

export function DetailedLocation({location, disabled, size}) {
  return (
    <LocationBase location={location} disabled={disabled} size={size} />
  );
}
