import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { ScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import EventApplyForm from "@/features/event/components/organisms/ApplyForm";

export default async function EventApplyTemplate({ event, myUserMetadata }) {
  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader pageType={EventPageTypeEnum.apply} isForApply={false} event={event} />
      </div>

      <div className="mb-8">
        <EventSummary pageType={EventPageTypeEnum.apply} event={event} />
      </div>

      <ScheduleList pageType={EventPageTypeEnum.apply} schedules={event.schedules} belong={myUserMetadata["belong"]} publicLocation={false} />

      <div className="mt-6 pt-6 border-t border-gray-200">
        <EventApplyForm />
      </div>
    </ItemContainer>
  );
}
