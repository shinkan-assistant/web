'use client';

import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum, EventPageMetaInfo } from "@/features/event/enums/page";
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
import { useMemo } from "react";
import ContentHeader from "@/base/components/molecules/ContentHeader";

export default function EventDetailEditTemplate({ event, myUserData, myParticipant, subNavInfos }) {
  const router = useRouter();
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.detailEdit);

  const allSchedules = event.schedules;

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
    <ItemContainer>
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <ContentHeader
            pageInfo={metaInfo}
            title={event["title"]}
            subTitle={"スケジュール変更 / キャンセル"}
            subNavInfos={subNavInfos}
          />
        </div>

        <EventScheduleList
          pageMetaInfo={metaInfo}
          allSchedules={allSchedules}
          belong={myUserData["belong"]}
          myParticipant={myParticipant}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
