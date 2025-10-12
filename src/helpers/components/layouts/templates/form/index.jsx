import { useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";

import FormUtilButtonArea from "./utilButtonArea";
import ItemTemplateLayout from "../item";

function FormSubmitButton({canSubmit, isProcessing}) {
  return (
    <button
      type="submit"
      disabled={!canSubmit || isProcessing}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        '送信'
      )}
    </button>
  );
}

function FormTemplateLayoutInner({
  Buttons, 
  genFormData, 
  judgeCanSubmit, 
  onSubmit, 
  children
}) {
  // リロードしても値が変わらないように、わざとstateで持たせている
  // *これやらないと、postDataの更新とともに値が変化してしまう
  const { watch, getValues, setError } = useFormContext();
  
  const [initialFormData] = useState(genFormData(getValues));
  const [formData, setFormData] = useState(initialFormData);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const subscription = watch(() => {
      const formDataTmp = genFormData(getValues())
      setFormData(formDataTmp);
      setCanSubmit(judgeCanSubmit(initialFormData, formDataTmp));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const [isProcessing, setIsProcessing] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      await onSubmit(formData)
    }
    catch (error) {
      // TODO エラーを格納
      // setError(error);
      console.error(error);
    } finally {
      // 処理の成功・失敗に関わらず、ローディング状態を終了
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {children}
      <FormUtilButtonArea Buttons={Buttons}  />
      <FormSubmitButton 
        canSubmit={canSubmit}
        isProcessing={isProcessing}
      />
    </form>
  );
}

export default function FormTemplateLayout({
  title, subTitle, subNavLinks,
  methods, Buttons, genFormData, judgeCanSubmit, onSubmit, 
  children
}) {
  return (
    <ItemTemplateLayout
      title={title}
      subTitle={subTitle}
      subNavLinks={subNavLinks}
    >
      <FormProvider {...methods}>
        <FormTemplateLayoutInner
          Buttons={Buttons} 
          genFormData={genFormData} 
          judgeCanSubmit={judgeCanSubmit}
          onSubmit={onSubmit}
        >
          {children}
        </FormTemplateLayoutInner>
      </FormProvider>
    </ItemTemplateLayout>
  );
}

