'use client';

import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { ScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/components/containers/Item";
import { EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/components/containers/Form";
import useOnSubmitForPost from "@/base/hooks/useOnSubmit";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { createNormalParticipant } from "@/features/participant/api/create";
import useCanSubmit from "@/base/hooks/useCanSubmit";
import { ScheduleTypeEnum } from "../../enums/data";
import { useRouter } from "next/navigation";

export default function EventApplyTemplate({ event, myUserMetadata }) {
  console.log('reload');
  const router = useRouter();
  
  const eventSchedules = event.schedules
    .filter(schedule => schedule["type"] === ScheduleTypeEnum.event);

  const inputElementRefs = eventSchedules
    .reduce((elements, schedule) => {
      return {
        ...elements,
        [schedule["id"]]: useRef(null),
      }
    }, {});

  const { canSubmit, updateCanSubmit } = useCanSubmit(
    function () {
      return eventSchedules.some(schedule => 
        inputElementRefs[schedule["id"]].current.checked,
      );
    }
  );

  const { onSubmit, isProcessing, errors } = useOnSubmitForPost({
    postData: async function (e) {
      const checkedScheduleIds = eventSchedules
        .filter(schedule => inputElementRefs[schedule["id"]].current.checked)
        .map(schedule => schedule["id"]);
      await createNormalParticipant(db, {
        userEmail: myUserMetadata.email, 
        eventId: event.id,
        scheduleIds: checkedScheduleIds,
      });
      // TODO 上から通知バーを出すようにする
      router.push(`/events/detail/${event["id"]}`);
    }
  });

  return (
    <ItemContainer>
      <FormContainer canSubmit={canSubmit} onSubmit={onSubmit} isProcessing={isProcessing} >
        <div className="ml-3 mb-4">
          <EventHeader pageType={EventPageTypeEnum.apply} isForApply={false} event={event} />
        </div>

        <div className="mb-8">
          <EventSummary pageType={EventPageTypeEnum.apply} event={event} />
        </div>

        <ScheduleList 
          pageType={EventPageTypeEnum.apply} 
          schedules={event.schedules}
          belong={myUserMetadata["belong"]}
          publicLocation={false}
          schedule2InputNameFunc={schedule => `is_participating-${schedule["id"]}`}
          inputElementRefs={inputElementRefs}
          updateCanSubmit={updateCanSubmit}
        />
      </FormContainer>
    </ItemContainer>
  );
}
