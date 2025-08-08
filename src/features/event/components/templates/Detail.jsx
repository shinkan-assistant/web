import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { ScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageTypeEnum } from "@/features/event/enums/page";

export default async function EventDetailTemplate({ event, myUserMetadata }) {
  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader pageType={EventPageTypeEnum.detail} event={event} />
      </div>

      <div className="mb-8">
        <EventSummary pageType={EventPageTypeEnum.detail} event={event} />
      </div>

      <ScheduleList pageType={EventPageTypeEnum.detail} schedules={event.schedules} belong={myUserMetadata["belong"]} publicLocation={true} />
    </ItemContainer>
  );
}
