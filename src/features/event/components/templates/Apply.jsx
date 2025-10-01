'use client';

import EventSummary from "@/features/event/components/contents/summary";
import { EventScheduleList } from "@/features/event/components/contents/schedules";
import ItemContainer from "@/helpers/components/layouts/templates/item";
import FormContainer from "@/helpers/components/layouts/contents/form";
import useForm from "@/helpers/components/layouts/contents/form/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName } from "../utils";
import { ResetButton } from "@/helpers/components/layouts/contents/form/ui/subButtons/Reset";
import { useMemo } from "react";
import { toast } from "react-toastify";
import participantGateway from "@/features/participant/api";

export default function EventApplyTemplate({ pageInfo, event, myUser }) {
  const router = useRouter();

  const allSchedules = event["schedules"];

  const inputInfos = useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {});
  }, [allSchedules]);

  const formHook = useForm({
    inputInfos,
    Buttons: [ResetButton],
    generateFormData: (_, inputValues) => {
      const formData = {};
      // 更新前と変化があった時のみ、formDataに格納する
      formData["schedule_ids"] = Object.keys(inputValues)
        .filter(name => inputValues[name])
        .map(name => getScheduleIdFromInputName(name));

      return formData;
    },
    judgeCanSubmit: (_, formData) => {
      return formData["schedule_ids"].length > 0;
    },
    handleSubmit: async function (formData) {
      await participantGateway.applyEvent({
        userEmail: myUser["email"],
        eventId: event["id"],
        scheduleIds: formData["schedule_ids"],
      });
      toast.warn(`${event["title"]}の申し込みが完了しました`);
      router.push(`/events/${event["id"]}`);
    }
  });

  return (
    <ItemContainer pageInfo={pageInfo} >
      <FormContainer hook={formHook} >
        <div className="mb-8">
          <EventSummary 
            pageInfo={pageInfo}
            event={event}
          />
        </div>

        <EventScheduleList 
          pageInfo={pageInfo}
          allSchedules={allSchedules}
          belong={myUser["belong"]}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
