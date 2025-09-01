'use client';

import EventSummary from "@/features/event/components/ui/summary";
import { EventScheduleList } from "@/features/event/components/ui/scheduleList";
import ItemContainer from "@/base/features/content/components/layouts/Item";
import FormContainer from "@/base/features/form/components/layouts/Form";
import { db } from "@/lib/firebase/clientApp";
import useForm from "@/base/features/form/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName } from "../../utils";
import { ResetButton } from "@/base/features/form/components/ui/subButtons/Reset";
import { createRecord } from "@/base/api/create";
import { CreateParticipantSchema } from "@/features/participant/schemas/api";
import { useMemo } from "react";

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
      await createRecord(db, "participants", {
        Schema: CreateParticipantSchema,
        uniqueData: {
          "user_email": myUser["email"],
          "event_id": event["id"],
        },
        otherData: {
          "is_organizer": false,
          "schedule_ids": formData["schedule_ids"],
        }
      });
      // TODO 通知：申し込みが完了しました
      router.push(`/events/detail/${event["id"]}`);
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
