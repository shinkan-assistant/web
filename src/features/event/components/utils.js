export function getInputName(schedule) {
  return `is_participating--${schedule["id"]}`
}

function getScheduleIdFromInputName(inputName) {
  return inputName.split("--")[1];
}

export function getCheckedScheduleIds({inputValues}) {
  return Object.keys(inputValues)
    .filter(inputName => inputValues[inputName])
    .map(inputName => getScheduleIdFromInputName(inputName));
}

export function getChangedScheduleIds({initialInputValues, inputValues}) {
  const inputNames = Object.keys(initialInputValues);

  const [cancelScheduleIds, addScheduleIds] = [[], []];
  for (let inputName of inputNames) {
    const scheduleId = getScheduleIdFromInputName(inputName);
    const isInitialChecked = initialInputValues[inputName];
    const isCurrentChecked = inputValues[inputName];
    if (isInitialChecked && !isCurrentChecked) cancelScheduleIds.push(scheduleId);
    if (!isInitialChecked && isCurrentChecked) addScheduleIds.push(scheduleId);
  }
  return [cancelScheduleIds, addScheduleIds];
}
