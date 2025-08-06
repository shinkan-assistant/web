import { EventDetail } from "@/server/components/app/events/Detail";
import { getEventByAuthUser } from "@/data/functions/event";
import { getUserMetadataByEmail } from "@/data/functions/user";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { notFound } from "next/navigation";
import React from "react";

export default async function EventItem({ params }) {
  const { id } = await params;

  const {firebaseServerApp, authUser} = await getAuthenticatedAppForUser();
  if (authUser === null) redirect('/');

  const db = getAuthenticatedDb(firebaseServerApp)

  const [myUserMetadata, event] = await Promise.all([
    getUserMetadataByEmail(db, {email: authUser.email}),
    getEventByAuthUser(db, {id: id, authUser: authUser}),
  ]);

  if (event === null) {
    notFound();
  }

  return (
    <EventDetail event = {event} myUserMetadata = {myUserMetadata} />
  );
}
