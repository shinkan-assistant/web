import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
import Summary from "@/components/event/contents/summary";
import { Schedules } from "@/components/event/contents/schedules";
import { EventsPageFilterEnum } from "./List";

export default function EventDetailTemplate({ event, myUser, myParticipant }) {
  return (
    <ItemTemplateLayout
      title={event["title"]}
      subNavLinks={[
        {
          href: `/events?filter=${EventsPageFilterEnum.participating}`, 
          text: "一覧へ戻る",
        },
        {
          href: `/events/${event.id}/confirm`, 
          text: "スケジュール変更 / キャンセル",
        }
      ]}
    >
      <div className="mb-8">
        <Summary 
          event={event}
          myParticipant={myParticipant}
          isItemPage={true}
        />
      </div>

      <Schedules 
        event={event}
        myUser={myUser}
        myParticipant={myParticipant}
      />
    </ItemTemplateLayout>
  );
}
