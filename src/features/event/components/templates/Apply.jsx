'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import { createNormalParticipant } from "@/features/participant/api/create";
import { db } from "@/lib/firebase/clientApp";
import useFormHook from "@/base/hooks/useForm";
import { useRouter } from "next/navigation";
import { getCheckedScheduleIds, getInputName } from "../utils";
import { Checkbox } from "@/base/components/atoms/FormInput";

export default function EventApplyTemplate({ event, myUserMetadata }) {
  const router = useRouter();

  const allSchedules = event.schedules;

  const formHook = useFormHook({
    inputInfos: allSchedules.reduce((acc, schedule) => {
      return {
        [getInputName(schedule)]: {
          Component: Checkbox,
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {}),
    judgeCanSubmit: ({inputValues}) => {
      const checkedScheduleIds = getCheckedScheduleIds({inputValues})
      return checkedScheduleIds.length > 0;
    },
    handleSubmit: async function ({inputValues}) {
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
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.apply} isApplyPage={false} event={event} />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.apply} event={event} />
        </div>

        <EventScheduleList 
          pageType={EventPageTypeEnum.apply} 
          allSchedules={allSchedules}
          participatingScheduleIds={getCheckedScheduleIds({inputValues: formHook.inputValues})}
          belong={myUserMetadata["belong"]}
          publicLocation={false}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
