'use client';

import { Schedules } from "@/features/event/components/contents/schedules";
import ItemContainer from "@/helpers/components/layouts/templates/item";
import FormContainer from "@/helpers/components/layouts/templates/form";
import useForm from "@/helpers/components/layouts/templates/form/hooks/useForm";
import FormButton from "@/helpers/components/layouts/templates/form/ui/subButtons/Base";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName, judgeIsParticipating } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/ui/subButtons/Reset";
import { useMemo } from "react";
import { toast } from "react-toastify";
import participantGateway from "@/features/participant/api";
import { useEffect, useState } from "react";

function AllCancelButton({formHook}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isAllCancel = formHook.inputNames.every(
      name => !formHook.inputValues[name]);
    setDisabled(isAllCancel);
  }, [formHook.inputValues])

  function onClick() { 
    setDisabled(true);

    const updatedInputValues = {};
    for (let name of formHook.inputNames) {
      updatedInputValues[name] = false;
    }
    formHook.changeInputValues(updatedInputValues);
  }

  return (
    <FormButton title="全キャンセル" onClick={onClick} disabled={disabled} />
  );
}

export default function EventConfirmTemplate({ pageInfo, event, myUser, myParticipant }) {
  const router = useRouter();

  const allSchedules = event["schedules"];

  const inputInfos = useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
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
    generateFormData: (initialValues, inputValues) => {
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
      const isAllCancel = formData["schedule_ids"].length === 0;

      await participantGateway.updateSchedules({myParticipant, formData});
      
      toast.info(isAllCancel ? `${event["title"]}のキャンセルが完了しました` : `${event["title"]}のスケジュールの変更が完了しました`);
      router.push(`/events/${event["id"]}`);
    },
  });

  return (
    <ItemContainer pageInfo={pageInfo}>
      <FormContainer hook={formHook} >
        <Schedules
          event={event}
          myUser={myUser}
          myParticipant={myParticipant}
          checkFormHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
