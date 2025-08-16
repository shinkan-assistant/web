import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageMetaInfo, EventPageTypeEnum } from "@/features/event/enums/page";

export default function EventDetailTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.detail);

  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader 
          pageMetaInfo={metaInfo}
          event={event}
          subNavInfos={subNavInfos}
        />
      </div>

      <div className="mb-8">
        <EventSummary 
          pageMetaInfo={metaInfo}
          event={event}
        />
      </div>

      <EventScheduleList 
        pageMetaInfo={metaInfo}
        allSchedules={event.schedules}
        belong={myUserData["belong"]} 
        myParticipant={myParticipant}
      />
    </ItemContainer>
  );
}
