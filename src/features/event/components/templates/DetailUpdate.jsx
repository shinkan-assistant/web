'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useFormController from "@/base/hooks/useFormController";
import { db } from "@/lib/firebase/clientApp";
import useCanSubmit from "@/base/hooks/useCanSubmit";
import { useRouter } from "next/navigation";
import { getChangedScheduleIds, getCheckedScheduleIds } from "../utils";

export default function EventDetailUpdateTemplate({ event, myUserMetadata }) {
  const allSchedules = event.schedules;
  const myParticipant = event.myParticipant
  const initialParticipatingScheduleIds = myParticipant.schedules.map(ps => ps["id"]);

  const { canSubmit, updateCanSubmit } = useCanSubmit(
    () => getChangedScheduleIds(allSchedules, {initialParticipatingScheduleIds})
      .reduce((cnt, ids) => cnt + ids.length, 0) > 0
  );

  const router = useRouter();
  const { onSubmit, isProcessing, errors } = useFormController({
    postData: async function (e) {
      const [cancelScheduleIds, addScheduleIds] = getChangedScheduleIds(allSchedules, {initialParticipatingScheduleIds});
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
      <FormContainer canSubmit={canSubmit} onSubmit={onSubmit} isProcessing={isProcessing} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.detailUpdate} isApplyPage={false} event={event} />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.detailUpdate} event={event} />
        </div>

        <EventScheduleList 
          pageType={EventPageTypeEnum.detailUpdate} 
          allSchedules={allSchedules}
          participatingScheduleIds={getCheckedScheduleIds(allSchedules)}
          belong={myUserMetadata["belong"]}
          publicLocation={false}
          updateCanSubmit={updateCanSubmit}
        />
      </FormContainer>
    </ItemContainer>
  );
}
