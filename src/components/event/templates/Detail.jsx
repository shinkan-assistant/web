import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
import Summary from "@/components/event/contents/summary";
import { Schedules } from "@/components/event/contents/schedules";
import { EventsPageFilterEnum } from "./List";
import judgeMyParticipantStatus from "../utils/myParticipantStatus";

export default function EventDetailTemplate({ event, myUser, myParticipant }) {
  const subNavLinks = [
    {
      href: `/events?filter=${EventsPageFilterEnum.participating}`, 
      text: "一覧へ戻る",
    },
  ];
  if (!judgeMyParticipantStatus(myParticipant, "cancel")) {
    subNavLinks.push({
      href: `/events/${event.id}/confirm`, 
      text: "スケジュール変更 / キャンセル",
    });
  }

  return (
    <ItemTemplateLayout
      title={event["title"]}
      subNavLinks={subNavLinks}
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
