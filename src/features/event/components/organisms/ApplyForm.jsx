'use client';

import FormContainer from "@/base/components/containers/Form";
import usePostData from "@/base/hooks/postData";
import Checkbox from "@/base/components/atoms/FormCheckbox";
import { useState } from "react";

export default function EventApplyForm() {
  const [isParticipating, setIsParticipating] = useState(null);

  const { postData, isLoading, errors } = usePostData(
    async function (e, {setErrors}) {
      // ここに申し込み処理のロジックを記述します
      // 例: APIへのPOSTリクエスト、Firestoreへのデータ保存など

      // 実際のアプリケーションでは、ここでAPIコールなどを行い、
      // 成功/失敗に応じてメッセージを設定します。
      await new Promise(resolve => setTimeout(resolve, 1500)); // 擬似的な遅延
    }
  );

  return (
    <FormContainer canSubmit={isParticipating} onSubmit={postData} isLoading={isLoading} >
      <Checkbox 
        name="is_participating" 
        label="このイベントに参加しますか？"
        onChange={(e) => setIsParticipating(e.target.checked)}
      />
    </FormContainer>
  );
}
