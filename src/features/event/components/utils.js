import { ParticipantUpdatedScheduleActionEnum } from "@/features/participant/enums/api";

export function getInputName(schedule) {
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

export function getCheckedScheduleIds({inputValues}) {
  return Object.keys(inputValues)
    .filter(inputName => inputValues[inputName])
    .map(inputName => getScheduleIdFromInputName(inputName));
}

export function getUpdatedScheduleInfos({initialParticipant, currentCheckedScheduleIds}) {
  const initialSchedules = initialParticipant["schedules"]
  const initialScheduleIds = initialSchedules.map(is => is["id"]);

  const updatedScheduleInfosByAction = {
    [ParticipantUpdatedScheduleActionEnum.cancel]: initialScheduleIds
      .filter(initialScheduleId => !currentCheckedScheduleIds.includes(initialScheduleId)),
    [ParticipantUpdatedScheduleActionEnum.add]: currentCheckedScheduleIds
      .filter(currentCheckedScheduleId => !initialScheduleIds.includes(currentCheckedScheduleId)),
  };

  return Object.keys(updatedScheduleInfosByAction)
    .reduce((acc, action) => {
      const targetScheduleIds = updatedScheduleInfosByAction[action];
      return acc.concat(
        targetScheduleIds.map(scheduleId => {
          return {"id": scheduleId, "action": action}
        })
      );
    }, []);
}
