import BlankLink from "@/helpers/components/ui/blankLink";
import uiSizeEnum from "@/helpers/components/ui/base/config/sizeEnum";

function OnlineMeetingPlatform({platform}) {
  return (
    <div className="flex items-center text-gray-600">
      <span className="font-medium mr-2">プラットフォーム:</span>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold shadow-sm">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.555-4.555A2 2 0 0017 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-2.555M15 10l-4.555 4.555M15 10l-4.555-4.555m0 0L4.555 15"></path></svg>
        {platform}
      </span>
    </div>
  );
}

function OnlineMeetingTextItem({label, text}) {
  return (
    <p className="text-gray-600">
      <span className="font-medium">{label}:</span> <span className="font-semibold text-gray-800">{text}</span>
    </p>
  );
}

export default function OnlineMeetingInfo({onlineMeetingInfo}) {
  return (
    <div>
      <h4 className="font-semibold text-lg text-gray-700 mb-2 mt-4 pt-4 border-t border-gray-200">オンライン会議情報</h4>
      <div className="mb-2">
        <OnlineMeetingPlatform platform={onlineMeetingInfo["platform"]} />
      </div>
      
      {onlineMeetingInfo["meeting_id"] && 
        <div className="mt-2">
          <OnlineMeetingTextItem label={"ミーティングID"} text={onlineMeetingInfo["meeting_id"]} />
        </div>
      }

      {onlineMeetingInfo["password"] && 
        <div className="mt-1">
          <OnlineMeetingTextItem label={"パスワード"} text={onlineMeetingInfo["password"]} />
        </div>
      }

      <div className="mt-3">
        <BlankLink href={onlineMeetingInfo["meeting_url"]} size={uiSizeEnum.LG} >
          <span>
            <svg 
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </span>
          <span>会議に参加</span>
        </BlankLink>
      </div>

      {onlineMeetingInfo["comment"] && (
        <div className="mt-3">
          <p className="text-gray-600 text-sm italic">
            コメント: {onlineMeetingInfo["comment"]}
          </p>
        </div>
      )}
    </div>
  );
}