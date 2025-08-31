'use client';

import { useRouter, useSearchParams } from "next/navigation";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";
import EventsTemplate from "@/features/event/components/templates/List";
import { useEffect, useState } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { ListPageInfo } from "@/base/features/page/info";
import { ItemLinkInfo } from "@/base/features/content/components/ui/ItemLink";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();

  const [targetEvents, setTargetEvents] = useState(null);

  useEffect(() => {
    if (!Object.values(EventsPageFilterEnum).includes(filter)) {
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    if (!myUserData || !allEvents || !myParticipants) {
      setTargetEvents(null);
      return;
    }
    
    if (filter === EventsPageFilterEnum.manage && !myUserData["belong"]["is_member"]) {
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    const targetEventsFilterFunc = {
      [EventsPageFilterEnum.participating]: (e) => {
        return myParticipants.some(mp => e["id"] === mp["event_id"])
      },
      [EventsPageFilterEnum.apply]: (e) => {
        return myParticipants.every(mp => e["id"] !== mp["event_id"])
      },
      [EventsPageFilterEnum.manage]: (e) => {
        if (myUserData["is_admin"]) 
          return true;
        return myParticipants.some(mp => e["id"] === mp["event_id"] && mp["is_organizer"]);
      }
    }[filter];

    setTargetEvents(allEvents.filter(targetEventsFilterFunc));
    
  }, [router, filter, myUserData, allEvents, myParticipants]);

  if (!targetEvents || !filter) {
    return <div>読み込み中です</div>
  }

  const pageInfo = new ListPageInfo({
    titleFunc: ({record}) => record["title"], 
    itemLink: {
      [EventsPageFilterEnum.participating]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/detail/${id}`,
        text: "詳細を見る",
      }),
      [EventsPageFilterEnum.apply]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/apply/${id}`,
        text: "申し込む",
      }),
      [EventsPageFilterEnum.manage]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/manage/${id}`,
        text: "管理する",
      }),
    }[filter],
  });

  return (
    <EventsTemplate
      pageInfo={pageInfo}
      events={targetEvents}
    />
  );
}
