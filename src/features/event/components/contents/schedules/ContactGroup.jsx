import BlankLink from "@/helpers/components/ui/blankLink";
import uiSizeEnum from "@/helpers/components/ui/base/config/sizeEnum";

export default function ContactGroup({contactGroup}) {
  return (
    <div>
      <h4 className="font-semibold text-lg text-gray-700 pt-4 border-t border-gray-200">連絡グループ</h4>
      <div className="mt-3">
        <BlankLink href={contactGroup["url"]} size={uiSizeEnum.LG} >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.24-.975M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {contactGroup["platform"]}に参加
        </BlankLink>
      </div>
    </div>
  );
}
