'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useForm from "@/base/hooks/useForm";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getInputName, getScheduleIdFromInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";
import { ResetButton } from "@/base/components/organisms/FormResetButton";
import { AllCancelButton } from "../organisms/AllCancelButton";
import { UpdateParticipantSchedulesSchema } from "@/features/participant/schemas/api";

export default function EventDetailEditTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  const router = useRouter();

  const allSchedules = event.schedules;

  const formHook = useForm({
    inputInfos: allSchedules.reduce((acc, schedule) => {
      return {
        [getInputName(schedule)]: {
          Component: Checkbox,
          label: "参加しますか？（キャンセルならチェックを外す）",
          initialValue: myParticipant.schedules.map(ps => ps["id"]).includes(schedule["id"])
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
    judgeCanSubmit: (formData) => {
      const initialScheduleIds = myParticipant.schedules.map(s => s["id"]);
      return initialScheduleIds.toString() !== formData["schedule_ids"].toString();
    },
    handleSubmit: async function (formData) {
      await updateRecord(db, "participants", {
        Schema: UpdateParticipantSchedulesSchema,
        initial: myParticipant,
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
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
