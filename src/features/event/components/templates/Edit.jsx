import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";
import { EventsPageFilterEnum } from "./List";

export default function EventEditTemplate({ event }) {
  return (
    <ItemTemplateLayout 
      title={event["title"]}
      subTitle="管理画面"
      subNavLinks={[
        {
          href: `/events?filter=${EventsPageFilterEnum.edit}`, 
          text: "一覧へ戻る",
        },
        {
          href: `/events/${event["id"]}/participants`, 
          text: "参加者一覧を見る",
        },
      ]}
    >
      <div className="mb-8">
        <Summary 
          event={event}
          isItemPage={true}
          useForEditForm
        />
      </div>

      <Schedules 
        event={event}
        useForEditForm
      />
    </ItemTemplateLayout>
  );
}
