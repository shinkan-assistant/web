'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useFormController from "@/base/hooks/useFormController";
import { db } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import { getUpdatedScheduleInfos, getCheckedScheduleIds, getInputName, getScheduleIdFromInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";
import { updateParticipantSchedules } from "@/features/participant/api/update";

export default function EventDetailUpdateTemplate({ event, myUserMetadata }) {
  const router = useRouter();

  const allSchedules = event.schedules;
  const myParticipant = event.myParticipant

  const formController = useFormController({
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
    }
  });

  return (
    <ItemContainer>
      <FormContainer controller={formController} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.detailUpdate} isApplyPage={false} event={event} />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.detailUpdate} event={event} />
        </div>

        <EventScheduleList
          pageType={EventPageTypeEnum.detailUpdate}
          allSchedules={allSchedules}
          belong={myUserMetadata["belong"]}
          formController={formController}
        />
      </FormContainer>
    </ItemContainer>
  );
}
