import ItemContainer from "@/base/features/content/components/layouts/Item";
import EventSummary from "@/features/event/components/sections/Summary";
import { EventScheduleList } from "@/features/event/components/sections/ScheduleList";
import TextInput from "@/base/features/form/components/ui/inputs/Text";
import { UpdateEventSchema } from "../../schemas/api";
import useForm from "@/base/features/form/hooks/useForm";
import { ResetButton } from "@/base/features/form/components/ui/subButtons/Reset";
import { useMemo } from "react";

export default function EventManageTemplate({ pageInfo, event }) {
  const inputInfos = useMemo(() => {
    return {
      "rough_location_name": {
        Component: TextInput,
        initialValue: event["rough_location_name"],
      }
    }
  }, [event.id, event.rough_location_name]);

  const formHook = useForm({
    inputInfos,
    Buttons: [ResetButton],
    convertToFormData: (initialValues, inputValues) => {
      const formData = {};

      for (let key of ["rough_location_name"]) {
        if (inputValues[key] === initialValues[key]) continue;
        formData[key] = inputValues[key];
      }

      return formData;
    },
    judgeCanSubmit: (initialFormData, formData) => {
      for (let key of ["rough_location_name"]) {
        if (formData[key] !== initialFormData[key]) return true;
      }
      return false;
    },
    handleSubmit: async function (formData) {
      await updateRecord(db, "participants", {
        Schema: UpdateEventSchema,
        initialData: event,
        formData: formData,
      });
      // TODO 上から通知バーを出すようにする
    },
  });

  return (
    <ItemContainer pageInfo={pageInfo}>
      <div className="mb-8">
        <EventSummary 
          pageInfo={pageInfo}
          event={event}
          formHook={formHook}
        />
      </div>

      <EventScheduleList 
        pageInfo={pageInfo}
        allSchedules={event["schedules"]}
        formHook={formHook}
      />
    </ItemContainer>
  );
}
