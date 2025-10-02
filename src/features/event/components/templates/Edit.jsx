import ItemContainer from "@/helpers/components/layouts/templates/item";
import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";
import useForm from "@/helpers/components/layouts/contents/form/hooks/useForm";
import { ResetButton } from "@/helpers/components/layouts/contents/form/ui/subButtons/Reset";
import { useMemo } from "react";
import eventGateway from "@/features/event/api";

export default function EventEditTemplate({ pageInfo, event }) {
  const inputInfos = useMemo(() => {
    return {
      "rough_location_name": {
        initialValue: event["rough_location_name"],
      }
    }
  }, [event.id, event.rough_location_name]);

  const formHook = useForm({
    inputInfos,
    Buttons: [ResetButton],
    generateFormData: (initialValues, inputValues) => {
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
      await eventGateway.updateDetail({event, formData});
      toast.warn(`${event["title"]}の編集が完了しました`);
    },
  });

  return (
    <ItemContainer pageInfo={pageInfo}>
      <div className="mb-8">
        <Summary 
          event={event}
          isItemPage={true}
          editFormHook={formHook}
        />
      </div>

      <Schedules 
        event={event}
        editFormHook={formHook}
      />
    </ItemContainer>
  );
}
