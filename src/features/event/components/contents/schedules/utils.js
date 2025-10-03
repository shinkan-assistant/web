export function getInputNameFromSchedule(schedule) {
  return `is_participating_${schedule["id"]}`
}

export function judgeIsParticipating(targetSchedule, {myParticipant}) {
  return myParticipant["schedules"].some(
    ps => ps["id"] === targetSchedule["id"] && ps["cancel"] === undefined
  );
}
