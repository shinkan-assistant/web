import FormButtonArea from "./ui/SubButtonList";

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

export default function FormContainer({hook, children}) {
  return (
    <form onSubmit={hook.onSubmit} className="space-y-6">
      {children}
      <FormButtonArea hook={hook} />
      <FormSubmitButton 
        canSubmit={hook.canSubmit}
        isProcessing={hook.isProcessing}
      />
    </form>
  );
}
