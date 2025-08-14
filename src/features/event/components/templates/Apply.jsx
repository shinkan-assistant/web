'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import { db } from "@/lib/firebase/clientApp";
import useForm from "@/base/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";
import { ResetButton } from "@/base/components/organisms/FormResetButton";
import { createRecord } from "@/base/api/create";
import { CreateParticipantSchema } from "@/features/participant/schemas/api";

export default function EventApplyTemplate({ event, myUserData, subNavInfos }) {
  const router = useRouter();
  const allSchedules = event.schedules;

  const formHook = useForm({
    inputInfos: allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          Component: Checkbox,
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {}),
    Buttons: [ResetButton],
    convertToFormData: (inputValues) => {
      const scheduleIds = Object.keys(inputValues)
        .filter(name => inputValues[name])
        .map(name => getScheduleIdFromInputName(name));
      return {
        "schedule_ids": scheduleIds,
      };
    },
    judgeCanSubmit: (_, formData) => {
      return formData["schedule_ids"].length > 0;
    },
    handleSubmit: async function (formData) {
      await createRecord(db, "participants", {
        Schema: CreateParticipantSchema,
        uniqueData: {
          "user_email": myUserData["email"],
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
    <ItemContainer>
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <EventHeader 
            pageType={EventPageTypeEnum.apply}
            event={event}
            subNavInfos={subNavInfos}
          />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.apply} event={event} />
        </div>

        <EventScheduleList 
          pageType={EventPageTypeEnum.apply} 
          allSchedules={allSchedules}
          belong={myUserData["belong"]}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
