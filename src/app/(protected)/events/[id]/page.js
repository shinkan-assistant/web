import { EventDetail } from "@/server/components/app/events/Detail";
import { getEventByLoginUser } from "@/server/data/functions/event";
import { getUserByEmail } from "@/server/data/functions/user";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { notFound } from "next/navigation";
import React from "react";

export default async function EventItem({ params }) {
  const { id } = await params;

  const {firebaseServerApp, loginUser} = await getAuthenticatedAppForUser();
  if (loginUser === null) redirect('/');

  const db = getAuthenticatedDb(firebaseServerApp)

  const [myUser, event] = await Promise.all([
    getUserByEmail(db, {email: loginUser.email}),
    getEventByLoginUser(db, {id: id, loginUser: loginUser}),
  ]);

  if (event === null) {
    notFound();
  }

  return (
    <EventDetail event = {event} myUser = {myUser} />
  );
}
