'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import { createNormalParticipant } from "@/features/participant/api/create";
import { db } from "@/lib/firebase/clientApp";
import useFormController from "@/base/hooks/useFormController";
import { useRouter } from "next/navigation";
import { getCheckedScheduleIds, getInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";

export default function EventApplyTemplate({ event, myUserMetadata }) {
  const router = useRouter();
  const allSchedules = event.schedules;

  const formController = useFormController({
    inputInfos: allSchedules.reduce((acc, s) => {
      return {
        [getInputName(s)]: {
          Component: Checkbox,
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {}),
    judgeCanSubmit: (inputValues) => {
      const checkedScheduleIds = getCheckedScheduleIds({inputValues})
      return checkedScheduleIds.length > 0;
    },
    handleSubmit: async function (inputValues) {
      const checkedScheduleIds = getCheckedScheduleIds({inputValues});
      await createNormalParticipant(db, {
        userEmail: myUserMetadata.email, 
        eventId: event.id,
        scheduleIds: checkedScheduleIds,
      });
      // TODO 通知：申し込みが完了しました
      router.push(`/events/detail/${event["id"]}`);
    }
  });

  return (
    <ItemContainer>
      <FormContainer controller={formController} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.apply} isApplyPage={false} event={event} />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.apply} event={event} />
        </div>

        <EventScheduleList 
          pageType={EventPageTypeEnum.apply} 
          allSchedules={allSchedules}
          participatingScheduleIds={getCheckedScheduleIds({inputValues: formController.inputValues})}
          belong={myUserMetadata["belong"]}
          publicLocation={false}
          formController={formController}
        />
      </FormContainer>
    </ItemContainer>
  );
}
