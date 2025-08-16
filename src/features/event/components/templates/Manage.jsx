import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageTypeEnum, EventPageMetaInfo } from "@/features/event/enums/page";
import { TextInput } from "@/base/components/atoms/FormInput";
import { UpdateEventSchema } from "../../schemas/api";
import useForm from "@/base/hooks/useForm";
import { ResetButton } from "@/base/components/organisms/FormResetButton";
import { useMemo } from "react";

export default function EventManageTemplate({ event, subNavInfos }) {
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.manage);

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
          formHook={formHook}
        />
      </div>

      <EventScheduleList 
        pageMetaInfo={metaInfo}
        allSchedules={event.schedules}
        formHook={formHook}
      />
    </ItemContainer>
  );
}
