'use client';

import { useForm } from "react-hook-form";

import Summary from "@/components/event/contents/summary";
import { Schedules } from "@/components/event/contents/schedules";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import { useRouter } from "next/navigation";
import { getInputNameFromSchedule } from "../contents/schedules/utils";
import { ResetButton } from "@/helpers/components/layouts/templates/form/utilButtons/Reset";
import { toast } from "react-toastify";
import { EventsPageFilterEnum } from "./List";
import participantService from "@/services/participant";
import { GoogleSignInButtonForRegister, UserInfoInputs, UserRegisterFormInfo, judgeRealSignIn, useEmailEffect } from "@/components/user/templates/Register";
import userService from "@/services/user";

export default function EventApplyTemplate({ event, authUser, myUser, keywordForMember }) {
  const router = useRouter();

  let userRegisterFormInfo = !judgeRealSignIn(authUser, myUser) 
    ? new UserRegisterFormInfo({
      defaultValues: myUser ?? {},
      disabled: judgeRealSignIn(authUser, myUser),
    }) : null;

  let defaultValues = event["schedules"].reduce((acc, schedule) => {
    return {
      [getInputNameFromSchedule(schedule)]: false,
      ...acc
    }
  }, {});
  if (userRegisterFormInfo) {
    defaultValues = {...defaultValues, ...userRegisterFormInfo.defaultValues};
  }
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEmailEffect({authUser, methods});

  return (
    <FormTemplateLayout 
      title={event["title"]}
      subTitle="申し込みフォーム"
      subNavLinks={
        judgeRealSignIn(authUser, myUser) ? 
        [
          {
            href: `/events?filter=${EventsPageFilterEnum.apply}`, 
            text: "一覧へ戻る",
          }
        ] : [
          {
            href: "/", 
            text: "ホームへ戻る",
          }
        ]
      }
      methods={methods}
      Buttons={[ResetButton]} 
      genFormData={(currentValues) => {
        let formData = {
          "schedule_ids": event["schedules"]
            .filter(schedule => currentValues[getInputNameFromSchedule(schedule)])
            .map(schedule => schedule["id"])
        };
        if (userRegisterFormInfo) {
          formData = {...formData, ...userRegisterFormInfo.genFormData(currentValues)}
        }
        return formData;
      }}
      judgeCanSubmit={(_, formData) => {
        if (userRegisterFormInfo)
          if (!userRegisterFormInfo.judgeCanSubmit(_, formData))
            return false;
        return formData["schedule_ids"].length > 0;
      }}
      onSubmit={async function (formData) {
        // ユーザーが存在しない時だけ、ユーザー登録を行う
        if (userRegisterFormInfo) {
          await userService.create({
            "email": authUser.email,
            ...formData,
            "keyword_for_member": keywordForMember,
          })
        }
        await participantService.apply({
          userEmail: authUser.email,
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
      
      {userRegisterFormInfo &&
        <>
          <GoogleSignInButtonForRegister authUser={authUser} myUser={myUser} />
          <UserInfoInputs formInfo={userRegisterFormInfo} authUser={authUser} />
        </>
      }

      <Schedules 
        event={event}
        myUser={myUser}
        useForCheckForm
      />
    </FormTemplateLayout>
  );
}
