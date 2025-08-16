'use client';

import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import ItemContainer from "@/base/content/components/containers/Item";
import { EventPageMetaInfo, EventPageTypeEnum } from "@/features/event/enums/page";
import FormContainer from "@/base/form/components/containers/Form";
import { db } from "@/lib/firebase/clientApp";
import useForm from "@/base/form/hooks/useForm";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule, getScheduleIdFromInputName } from "../utils";
import { Checkbox } from "@/base/form/components/atoms/Input";
import { ResetButton } from "@/base/form/components/organisms/ResetButton";
import { createRecord } from "@/base/api/create";
import { CreateParticipantSchema } from "@/features/participant/schemas/api";
import { useMemo } from "react";
import ContentHeader from "@/base/content/components/molecules/Header";

export default function EventApplyTemplate({ event, myUserData, subNavInfos }) {
  const router = useRouter();
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.apply);

  const allSchedules = event.schedules;

  const inputInfos = useMemo(() => {
    return allSchedules.reduce((acc, schedule) => {
      return {
        [getInputNameFromSchedule(schedule)]: {
          Component: Checkbox,
          label: "参加しますか？",
          initialValue: false,
        },
        ...acc
      }
    }, {});
  }, [allSchedules]);

  const formHook = useForm({
    inputInfos,
    Buttons: [ResetButton],
    convertToFormData: (_, inputValues) => {
      const formData = {};
      // 更新前と変化があった時のみ、formDataに格納する
      formData["schedule_ids"] = Object.keys(inputValues)
        .filter(name => inputValues[name])
        .map(name => getScheduleIdFromInputName(name));

      return formData;
    },
    judgeCanSubmit: (_, formData) => {
      return formData["schedule_ids"].length > 0;
    },
    handleSubmit: async function (formData) {
      await createRecord(db, "participants", {
        Schema: CreateParticipantSchema,
        uniqueData: {
          "user_email": myUserData["email"],
          "event_id": event["id"],
        },
        otherData: {
          "is_organizer": false,
          "schedule_ids": formData["schedule_ids"],
        }
      });
      // TODO 通知：申し込みが完了しました
      router.push(`/events/detail/${event["id"]}`);
    }
  });

  return (
    <ItemContainer>
      <FormContainer hook={formHook} >
        <div className="ml-3 mb-4">
          <ContentHeader 
            pageInfo={metaInfo}
            title={event["title"]}
            subTitle="申し込みフォーム"
            subNavInfos={subNavInfos}
          />
        </div>

        <div className="mb-8">
          <EventSummary 
            pageMetaInfo={metaInfo}
            event={event}
          />
        </div>

        <EventScheduleList 
          pageMetaInfo={metaInfo}
          allSchedules={allSchedules}
          belong={myUserData["belong"]}
          formHook={formHook}
        />
      </FormContainer>
    </ItemContainer>
  );
}
