'use client';

import { useForm } from "react-hook-form";

import Summary from "@/components/event/contents/summary";
import { Schedules } from "@/components/event/contents/schedules";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/utilButtons/Reset";
import { toast } from "react-toastify";
import { EventsPageFilterEnum } from "./List";
import participantService from "@/services/participant";

export default function EventApplyTemplate({ event, myUser }) {
  const router = useRouter();

  return (
    <FormTemplateLayout 
      title={event["title"]}
      subTitle="申し込みフォーム"
      subNavLinks={[
        {
          href: `/events?filter=${EventsPageFilterEnum.apply}`, 
          text: "一覧へ戻る",
        }
      ]}
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
        await participantService.apply({
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
