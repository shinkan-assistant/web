'use client';

import { useRouter, useSearchParams } from "next/navigation";
import EventsPageFilterEnum from "@/features/event/components/const/listPageFilterEnum";
import EventsTemplate from "@/features/event/components/templates/List";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useEvents } from "@/stores/contexts/events";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { ListPageInfo } from "@/helpers/components/layouts/main/base/config";
import { ItemLinkInfo } from "@/helpers/components/layouts/main/list/ui/ItemLink";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const myUser = useMyUser();
  const events = useEvents();
  const myParticipants = useMyParticipants();

  const [targetEvents, setTargetEvents] = useState(null);

  useEffect(() => {
    if (!Object.values(EventsPageFilterEnum).includes(filter)) {
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    if (!myUser || !events || !myParticipants) {
      setTargetEvents(null);
      return;
    }
    
    if (filter === EventsPageFilterEnum.manage && !myUser["belong"]["is_member"]) {
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
        if (myUser["is_admin"]) 
          return true;
        return myParticipants.some(mp => e["id"] === mp["event_id"] && mp["is_organizer"]);
      }
    }[filter];

    setTargetEvents(events.filter(targetEventsFilterFunc));
    
  }, [router, filter, myUser, events, myParticipants]);

  if (!targetEvents || !filter) {
    return <div>読み込み中です</div>
  }

  const pageInfo = new ListPageInfo({
    titleFunc: ({record}) => record["title"], 
    itemLink: {
      [EventsPageFilterEnum.participating]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/${id}`,
        text: "詳細を見る",
      }),
      [EventsPageFilterEnum.apply]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/${id}/apply`,
        text: "申し込む",
      }),
      [EventsPageFilterEnum.manage]: new ItemLinkInfo({
        hrefFunc: ({id}) => `/events/${id}/edit`,
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
