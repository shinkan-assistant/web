import { Badge } from "@/components/ui/badge";
import { RoleEnum } from "@/data/enums/participant";

export function EventBadgeList({event, roleName, textSizeClass}) {
  const badgeInfos = [];

  if (roleName == RoleEnum.organizer) {
    badgeInfos.push({
      key: "participant-role",
      text: roleName === RoleEnum.organizer ? RoleEnum.organizer : RoleEnum.participant,
      bgColorClass: "bg-red-100",
      textColorClass: "text-red-800",
    });
  }

  badgeInfos.push(
    {
      key: "event-type",
      text: event.type,
      bgColorClass: "bg-sky-100",
      textColorClass: "text-sky-800",
    }
  );

  return (
    <div className="flex gap-x-2">
      {badgeInfos.map((badgeInfo) => (
        <Badge 
          key={badgeInfo.key}
          text={badgeInfo.text} 
          bgColorClass={badgeInfo.bgColorClass} 
          textColorClass={badgeInfo.textColorClass} 
          textSizeClass={textSizeClass} />
      ))}
    </div>
  );
}

export const EventItemIcon = {
  date: function ({className}) {
    return <svg className={`text-blue-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
  },
  time: function ({className}) {
    return <svg className={`text-blue-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
  },
  location: function ({className}) {
    return <svg className={`text-red-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
  },
  fee: function ({className}) {
    return <svg className={`text-green-500 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
  },
}
