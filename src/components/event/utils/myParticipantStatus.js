export default function judgeMyParticipantStatus(myParticipant, fieldName) {
  return myParticipant?.schedules.every(s => s.hasOwnProperty(fieldName))
}
