export function getInputNameFromSchedule(schedule) {
  return `is_participating.[${schedule["id"]}]`
}

export function getScheduleIdFromInputName(inputName) {
  // `is_participating.[<ID>]` の形式を正規表現でマッチ
  const match = inputName.match(/^is_participating\.\[(.*?)\]$/);
  
  // マッチした場合、キャプチャグループ1（[ ]の中身）を返す
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

export function judgeIsParticipating(targetSchedule, {myParticipant}) {
  return myParticipant["schedules"].some(
    ps => ps["id"] === targetSchedule["id"] && ps["cancel"] === undefined
  );
}
