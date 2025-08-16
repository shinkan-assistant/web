'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useForm from "@/base/hooks/useForm";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName, judgeIsParticipating } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";
import { ResetButton } from "@/base/components/organisms/FormResetButton";
import { AllCancelButton } from "../organisms/AllCancelButton";
import { UpdateParticipantSchedulesSchema } from "@/features/participant/schemas/api";
import { updateRecord } from "@/base/api/update";

export default function EventDetailEditTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  const router = useRouter();

  const allSchedules = event.schedules;

  const formHook = useForm({
    inputInfos: allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          Component: Checkbox,
          label: "参加しますか？（キャンセルならチェックを外す）",
          initialValue: judgeIsParticipating(schedule, { myParticipant })
        },
        ...acc
      }
    }, {}),
    Buttons: [ResetButton, AllCancelButton],
    convertToFormData: (inputValues) => {
      const scheduleIds = Object.keys(inputValues)
        .filter(name => inputValues[name])
        .map(name => getScheduleIdFromInputName(name));
      return {
        "schedule_ids": scheduleIds,
      };
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
    <ItemContainer>
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <EventHeader
            pageType={EventPageTypeEnum.detailEdit} 
            event={event}
            subNavInfos={subNavInfos}
          />
        </div>

        <EventScheduleList
          pageType={EventPageTypeEnum.detailEdit}
          allSchedules={allSchedules}
          belong={myUserData["belong"]}
          myParticipant={myParticipant}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
