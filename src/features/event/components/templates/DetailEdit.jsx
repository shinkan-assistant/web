'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { AllCancelButton, EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useFormHook from "@/base/hooks/useForm";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getUpdatedScheduleInfos, getCheckedScheduleIds, getInputName, getScheduleIdFromInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";
import { updateParticipantSchedules } from "@/features/participant/api/update";
import { ResetButton } from "@/base/components/organisms/FormResetButton";

export default function EventDetailEditTemplate({ event, myUserData }) {
  const router = useRouter();

  const allSchedules = event.schedules;
  const myParticipant = event.myParticipant

  const formHook = useFormHook({
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
    judgeCanSubmit: ({inputValues}) => {
      const updatedScheduleInfos = getUpdatedScheduleInfos({
        initialParticipant: myParticipant, 
        currentCheckedScheduleIds: getCheckedScheduleIds({inputValues}),
      });
      return updatedScheduleInfos.length > 0;
    },
    handleSubmit: async function ({inputValues}) {
      await updateParticipantSchedules(db, {
        initialParticipant: myParticipant,
        currentCheckedScheduleIds: getCheckedScheduleIds({ inputValues }),
      });
      // TODO 上から通知バーを出すようにする
      router.push(`/events/detail/${event["id"]}`);
    },
  });

  return (
    <ItemContainer>
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.detailEdit} isApplyPage={false} event={event} />
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
