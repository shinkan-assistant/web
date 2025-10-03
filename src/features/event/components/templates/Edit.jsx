import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";

export default function EventEditTemplate({ pageInfo, event }) {
  return (
    <ItemTemplateLayout pageInfo={pageInfo}>
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
