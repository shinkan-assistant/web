export function applyEventRoute({userEmail, eventId, scheduleIds}) {
  // 権限管理
  applyEvent({userEmail, eventId, scheduleIds});
}

export function updateEventScheduleRoute({userEmail, eventId, updatedScheduleIds}) {
  updateEventSchedule({userEmail, eventId, updatedScheduleIds});
}
