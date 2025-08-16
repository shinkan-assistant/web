import ItemContainer from "@/base/components/containers/Item";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageMetaInfo, EventPageTypeEnum } from "@/features/event/enums/page";
import ContentHeader from "@/base/components/molecules/ContentHeader";

export default function EventDetailTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.detail);

  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <ContentHeader
          pageInfo={metaInfo}
          title={event["title"]}
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
