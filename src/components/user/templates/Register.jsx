'use client';

import { useForm } from "react-hook-form";
import FormTemplateLayout from "@/helpers/components/layouts/templates/form";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetButton } from "@/helpers/components/layouts/templates/form/utilButtons/Reset";
import { toast } from "react-toastify";
import TextInput from "@/helpers/components/layouts/templates/form/inputs/Text";
import { useAuthUser } from "@/stores/sessions/authUser";
import Image from "next/image";
import { signInWithGoogleForRegister, signOut } from "@/helpers/auth/client";
import { useEffect } from "react";
import { EventsPageFilterEnum } from "@/components/event/templates/List";
import SelectInput from "@/helpers/components/layouts/templates/form/inputs/Select";
import GenderEnum from "@/data/enums/user/gender";
import AcademicLevelEnum from "@/data/enums/user/academicLevel";
import userService from "@/services/user";

export class UserRegisterFormInfo {
  inputInfos = {
    "family_name": {
      type: "text",
      defaultValue: "",
      Component: TextInput,
      label: "姓",
    },
    "given_name": {
      type: "text",
      defaultValue: "",
      Component: TextInput,
      label: "名",
    },
    "gender": {
      type: "text",
      defaultValue: "",
      Component: SelectInput,
      label: "性別",
      choices: Object.values(GenderEnum),
    },
    "university": {
      type: "text",
      defaultValue: "",
      Component: TextInput,
      label: "大学名",
    },
    "academic_level": {
      type: "text",
      defaultValue: "",
      Component: SelectInput,
      label: "学位",
      choices: Object.values(AcademicLevelEnum),
    },
    "grade": {
      type: "number",
      defaultValue: "",
      options: {min: 1, max: 6},
      Component: TextInput,
      label: "学年",
    },
  }

  get defaultValues() {
    return Object.keys(this.inputInfos).reduce((acc, name) => {
      return {
        ...acc,
        [name]: this.inputInfos[name].defaultValue
      }
    }); 
  }

  genFormData = (currentValues) => {
    const formData = {};
    for (let name of Object.keys(this.inputInfos)) {
      formData[name] = {
        "text": currentValues[name],
        "number": parseInt(currentValues[name]),
      }[this.inputInfos[name].type];
    }
    return formData;
  }

  judgeCanSubmit = (_, formData) => {
    for (let name of Object.keys(this.inputInfos)) {
      const v = formData[name];
      const info = this.inputInfos[name];
      const isOk = {
        "text": () => v.length > 0,
        "number": () => !isNaN(v) && (info.options.min <= v && v <= info.options.max),
      }[info.type]();
      if (!isOk) return false;
    }
    return true;
  }
}

export function UserInfoInputs({formInfo, isTmpSignIn}) {
  return (
    <>
      {Object.keys(formInfo.inputInfos).map((name, index) => {
      const info = formInfo.inputInfos[name];
      return (
          <div key={index}>
            {info.Component === TextInput &&
              <TextInput 
                name={name}
                type={info.type}
                label={info.label}
                disabled={!isTmpSignIn}
              />
            }
            {info.Component === SelectInput &&
              <SelectInput 
                name={name}
                label={info.label}
                choices={info.choices}
                disabled={!isTmpSignIn}
              />
            }
          </div>
        );
      })}
    </>
  );
}

export function GoogleSignInButtonForRegister({authUser, isTmpSignIn}) {
  if (isTmpSignIn) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        {authUser.photoURL && (
          <Image
            src={authUser.photoURL}
            alt="User profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {authUser.displayName}
          </p>
          <p className="text-xs text-gray-500 truncate">{authUser.email}</p>
        </div>
        <button
          onClick={async () => {
            await signOut();
            signInWithGoogleForRegister();
          }}
          className="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          アカウントを切り替える
        </button>
      </div>
    );
  }
  else {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-inner text-center mb-6">
        <p className="mb-4 text-gray-700 font-medium">
          まずは、Googleでサインインしてください。
        </p>
        <button
          onClick={signInWithGoogleForRegister}
          type="button"
          className="flex items-center justify-center w-full rounded-lg font-semibold px-6 py-3 bg-sky-600 text-white hover:bg-sky-700 transition-colors duration-300 transform hover:scale-105 shadow-md"
        >
          <Image
            src="/icons/google.svg"
            alt="Google logo"
            width={24}
            height={24}
            className="mr-3"
          />
          <span className="text-lg">Googleでサインイン</span>
        </button>
      </div>
    );
  }
}

export const judgeTmpSignIn = (authUser) => {
  return Boolean(authUser);
}

export default function UserRegisterTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordForMember = searchParams.get("keyword");

  const formInfo = new UserRegisterFormInfo();

  const authUser = useAuthUser();
  const methods = useForm({
    defaultValues: formInfo.defaultValues,
    mode: "onChange"
  });

  const { setValue } = methods;
  useEffect(() => {
    (async() => {
      // 仮ログインの場合
      if (authUser) 
        setValue("email", authUser.email);
      // 仮ログインでない場合
      else 
        setValue("email", "");
    })();
  }, [authUser, setValue]);

  const isTmpSignIn = judgeTmpSignIn(authUser);

  return (
    <FormTemplateLayout 
      title="ユーザー登録"
      subNavLinks={[
        {
          href: `/`, 
          text: "ホームへ戻る",
        }
      ]}
      methods={methods}
      Buttons={[ResetButton]} 
      genFormData={formInfo.genFormData}
      judgeCanSubmit={formInfo.judgeCanSubmit}
      onSubmit={async function (formData) {
        await userService.create({
          "email": authUser.email,
          ...formData,
          "keyword_for_member": keywordForMember,
        })
        toast.info(`${authUser.email}でユーザー登録が完了しました`);
        router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      }}
    >
      <GoogleSignInButtonForRegister authUser={authUser} isTmpSignIn={isTmpSignIn} />
      <UserInfoInputs formInfo={formInfo} isTmpSignIn={isTmpSignIn} />
    </FormTemplateLayout>
  );
};