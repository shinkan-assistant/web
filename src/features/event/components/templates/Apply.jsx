'use client';

import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";
import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import useForm from "@/helpers/components/layouts/templates/form/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/ui/subButtons/Reset";
import { useMemo } from "react";
import { toast } from "react-toastify";
import participantGateway from "@/features/participant/api";

export default function EventApplyTemplate({ pageInfo, event, myUser }) {
  const router = useRouter();

  const allSchedules = event["schedules"];

  const formMethods = useForm(useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {});
  }, [allSchedules]));

  return (
    <ItemTemplateLayout pageInfo={pageInfo} >
      <FormTemplateLayout 
        methods={formMethods} 
        Buttons={[ResetButton]} 
        genFormData={() => {
          const formData = {};
          // 更新前と変化があった時のみ、formDataに格納する
          formData["schedule_ids"] = Object.keys(formMethods.inputValues)
            .filter(name => formMethods.inputValues[name])
            .map(name => getScheduleIdFromInputName(name));
    
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
          checkFormHook={formMethods}
        />
      </FormTemplateLayout>
    </ItemTemplateLayout>
  );
}
