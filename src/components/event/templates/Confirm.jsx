'use client';

import { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Schedules } from "@/components/event/contents/schedules";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import FormUtilButton from "@/helpers/components/layouts/templates/form/utilButtons/Base";
import { getInputNameFromSchedule, judgeIsParticipating } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/utilButtons/Reset";
import { EventsPageFilterEnum } from "./List";
import participantService from "@/services/participant";

function AllCancelButton({event}) {
  const { watch, getValues, reset } = useFormContext();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const subscription = watch(() => {
      const isAllCancel = event["schedules"]
        .every(schedule => !getValues(getInputNameFromSchedule(schedule)))
      setDisabled(isAllCancel);
    });
    return () => subscription.unsubscribe();
  }, [watch])

  function onClick() { 
    setDisabled(true);

    const updatedInputValues = {};
    for (let schedule of event["schedules"]) {
      updatedInputValues[getInputNameFromSchedule(schedule)] = false;
    }
    reset(updatedInputValues);
  }

  return (
    <FormUtilButton title="全キャンセル" onClick={onClick} disabled={disabled} />
  );
}

export default function EventConfirmTemplate({ event, myUser, myParticipant }) {
  const router = useRouter();

  return (
    <FormTemplateLayout 
      title={event["title"]}
      subTitle="スケジュール変更 / キャンセル"
      subNavLinks={[
        {
          href: `/events?filter=${EventsPageFilterEnum.participating}`, 
          text: "一覧へ戻る",
        },
        {
          href: `/events/${event.id}`, 
          text: "編集キャンセル",
        }
      ]}
      methods={useForm({
        defaultValues: event["schedules"].reduce((acc, schedule) => {
          return {
            [getInputNameFromSchedule(schedule)]: judgeIsParticipating(schedule, { myParticipant }),
            ...acc
          }
        }, {})
      })}
      Buttons={[ResetButton, () => AllCancelButton({event})]}
      genFormData={(currentValues) => {
        const formData = {};
        formData["schedule_ids"] = event["schedules"]
          .filter(schedule => currentValues[getInputNameFromSchedule(schedule)])
          .map(schedule => schedule["id"]);
        return formData;
      }}
      judgeCanSubmit={(initialFormData, formData) => {
        console.log(initialFormData, formData);
        if (initialFormData["schedule_ids"].length !== formData["schedule_ids"].length) return true;
        for (let scheduleId of formData["schedule_ids"]) {
          if (!initialFormData["schedule_ids"].includes(scheduleId)) return true;
        }
        return false;
      }}
      onSubmit={async function (formData) {
        const isAllCancel = formData["schedule_ids"].length === 0;
  
        await participantService.updateSchedules({
          myParticipant, 
          scheduleIds: formData["schedule_ids"],
        });
        
        toast.info(isAllCancel ? `${event["title"]}のキャンセルが完了しました` : `${event["title"]}のスケジュールの変更が完了しました`);
        router.push(`/events/${event["id"]}`);
      }}
    >
      <Schedules
        event={event}
        myUser={myUser}
        myParticipant={myParticipant}
        useForCheckForm
      />
    </FormTemplateLayout>
  );
}
