'use client';

import { useForm } from "react-hook-form";

import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/utilButtons/Reset";
import { toast } from "react-toastify";
import participantGateway from "@/features/participant/api";

export default function EventApplyTemplate({ pageInfo, event, myUser }) {
  const router = useRouter();

  return (
    <FormTemplateLayout 
      pageInfo={pageInfo}
      methods={useForm({
        defaultValues: event["schedules"].reduce((acc, schedule) => {
          return {
            [getInputNameFromSchedule(schedule)]: false,
            ...acc
          }
        }, {})
      })}
      Buttons={[ResetButton]} 
      genFormData={(currentValues) => {
        const formData = {};
        formData["schedule_ids"] = event["schedules"]
          .filter(schedule => currentValues[getInputNameFromSchedule(schedule)])
          .map(schedule => schedule["id"]);
        return formData;
      }}
      judgeCanSubmit={(_, formData) => {
        return formData["schedule_ids"].length > 0;
      }}
      onSubmit={async function (formData) {
        await participantGateway.applyEvent({
          userEmail: myUser["email"],
          eventId: event["id"],
          scheduleIds: formData["schedule_ids"],
        });
        toast.info(`${event["title"]}の申し込みが完了しました`);
        router.push(`/events/${event["id"]}`);
      }}
    >
      <div className="mb-8">
        <Summary
          event={event}
          isItemPage={true}
        />
      </div>

      <Schedules 
        event={event}
        myUser={myUser}
        useForCheckForm
      />
    </FormTemplateLayout>
  );
}
