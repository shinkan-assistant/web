import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageTypeEnum } from "@/features/event/enums/page";

export default function EventDetailTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader 
          pageType={EventPageTypeEnum.detail}
          event={event}
          subNavInfos={subNavInfos}
        />
      </div>

      <div className="mb-8">
        <EventSummary pageType={EventPageTypeEnum.detail} event={event} />
      </div>

      <EventScheduleList 
        pageType={EventPageTypeEnum.detail} 
        allSchedules={event.schedules}
        belong={myUserData["belong"]} 
        myParticipant={myParticipant}
      />
    </ItemContainer>
  );
}
