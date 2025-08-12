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
import { getChangedScheduleIds, getInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";

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
          initialValue: myParticipant.schedules.find(ps => schedule["id"] === ps["id"]),
        },
        ...acc
      }
    }, {}),
    judgeCanSubmit: ({initialInputValues, inputValues}) => {
      const [cancelScheduleIds, addScheduleIds] = getChangedScheduleIds({initialInputValues, inputValues})
      return (cancelScheduleIds + addScheduleIds).length > 0;
    },
    handleSubmit: async function ({initialInputValues, inputValues}) {
      const [cancelScheduleIds, addScheduleIds] = getChangedScheduleIds({initialInputValues, inputValues});
      await updateParticipant(db, {
        id: myParticipant["id"],
        cancelScheduleIds: cancelScheduleIds,
        addScheduleIds: addScheduleIds,
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
