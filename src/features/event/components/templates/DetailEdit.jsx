'use client';

import { EventScheduleList } from "@/features/event/components/ui/scheduleList";
import ItemContainer from "@/base/features/content/components/layouts/Item";
import FormContainer from "@/base/features/form/components/layouts/Form";
import useForm from "@/base/features/form/hooks/useForm";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName, judgeIsParticipating } from "../../utils";
import { ResetButton } from "@/base/features/form/components/ui/subButtons/Reset";
import { AllCancelButton } from "../ui/form/AllCancelButton";
import { UpdateParticipantSchedulesSchema } from "@/backend/features/participant/schemas/api";
import { updateRecord } from "@/backend/gateways/db/update";
import { useMemo } from "react";
import { toast } from "react-toastify";

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

      await updateRecord(db, "participants", {
        Schema: UpdateParticipantSchedulesSchema,
        initialData: myParticipant,
        formData: formData,
      });
      
      toast.info(isAllCancel ? `${event["title"]}のキャンセルが完了しました` : `${event["title"]}のスケジュールの変更が完了しました`);
      router.push(`/events/detail/${event["id"]}`);
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
