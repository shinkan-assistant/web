'use client';

import { EventScheduleList } from "@/features/event/components/contents/scheduleList";
import ItemContainer from "@/helpers/components/layouts/main/item";
import FormContainer from "@/helpers/components/layouts/contents/form";
import useForm from "@/helpers/components/layouts/contents/form/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName, judgeIsParticipating } from "../utils";
import { ResetButton } from "@/helpers/components/layouts/contents/form/ui/subButtons/Reset";
import { AllCancelButton } from "../contents/form/ui/AllCancelButton";
import { useMemo } from "react";
import { toast } from "react-toastify";
import participantGateway from "@/features/participant/api";

export default function EventDetailEditTemplate({ pageInfo, event, myUser, myParticipant }) {
  const router = useRouter();

  const allSchedules = event["schedules"];

  const inputInfos = useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          label: "参加しますか？（キャンセルならチェックを外す）",
          initialValue: judgeIsParticipating(schedule, { myParticipant })
        },
        ...acc
      }
    }, {});
  }, [allSchedules, myParticipant]);

  const formHook = useForm({
    inputInfos,
    Buttons: [ResetButton, AllCancelButton],
    generateFormData: (initialValues, inputValues) => {
      const formData = {};

      formData["schedule_ids"] = Object.keys(inputValues)
        .filter(name => inputValues[name])
        .map(name => getScheduleIdFromInputName(name));
      
      return formData;
    },
    judgeCanSubmit: (initialFormData, formData) => {
      if (initialFormData["schedule_ids"].length !== formData["schedule_ids"].length) return true;
      for (let scheduleId of formData["schedule_ids"]) {
        if (!initialFormData['schedule_ids'].includes(scheduleId)) return true;
      }
      return false;
    },
    handleSubmit: async function (formData) {
      const isAllCancel = formData["schedule_ids"].length === 0;

      await participantGateway.updateSchedules({myParticipant, formData});
      
      toast.info(isAllCancel ? `${event["title"]}のキャンセルが完了しました` : `${event["title"]}のスケジュールの変更が完了しました`);
      router.push(`/events/${event["id"]}`);
    },
  });

  return (
    <ItemContainer pageInfo={pageInfo}>
      <FormContainer hook={formHook} >
        <EventScheduleList
          pageInfo={pageInfo}
          allSchedules={allSchedules}
          belong={myUser["belong"]}
          myParticipant={myParticipant}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
