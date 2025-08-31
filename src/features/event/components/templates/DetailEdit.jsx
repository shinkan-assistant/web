'use client';

import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/page/content/components/containers/Item";
import { EventPageTypeEnum, EventPageInfo } from "@/features/event/enums/page";
import FormContainer from "@/base/form/components/containers/Form";
import useForm from "@/base/form/hooks/useForm";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName, judgeIsParticipating } from "../../utils";
import { Checkbox } from "@/base/form/components/atoms/Input";
import { ResetButton } from "@/base/form/components/organisms/ResetButton";
import { AllCancelButton } from "../atoms/AllCancelButton";
import { UpdateParticipantSchedulesSchema } from "@/features/participant/schemas/api";
import { updateRecord } from "@/base/api/update";
import { useMemo } from "react";

export default function EventDetailEditTemplate({ pageInfo, event, myUserData, myParticipant }) {
  const router = useRouter();

  const allSchedules = event["schedules"];

  const inputInfos = useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          Component: Checkbox,
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
    convertToFormData: (_, inputValues) => {
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
      await updateRecord(db, "participants", {
        Schema: UpdateParticipantSchedulesSchema,
        initialData: myParticipant,
        formData: formData,
      });
      // TODO 上から通知バーを出すようにする
      router.push(`/events/detail/${event["id"]}`);
    },
  });

  return (
    <ItemContainer pageInfo={pageInfo}>
      <FormContainer hook={formHook} >
        <EventScheduleList
          pageInfo={pageInfo}
          allSchedules={allSchedules}
          belong={myUserData["belong"]}
          myParticipant={myParticipant}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
