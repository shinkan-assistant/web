export function getInputName(schedule) {
  return `is_participating--${schedule["id"]}`
}

function getScheduleIdFromInputName(inputName) {
  return inputName.split("--")[1];
}

export function getInputElement(schedule) {
  const inputName = getInputName(schedule);
  return document.querySelector(`form input[name="${inputName}"]`);
}

export function getInputElements(allSchedules) {
  return allSchedules
    .reduce((elements, s) => {
      return {
        ...elements,
        [s["id"]]: getInputElement(s),
      }
    }, {});
}

export function getCheckedScheduleIds({inputValues}) {
  return Object.keys(inputValues)
    .filter(inputName => inputValues[inputName])
    .map(inputName => getScheduleIdFromInputName(inputName));
}

export function getChangedScheduleIds(allSchedules, {initialParticipatingScheduleIds}) {
  const [cancelScheduleIds, addScheduleIds] = [[], []];
  for (let s of allSchedules) {
    const isInitialChecked = initialParticipatingScheduleIds.some(psId => psId === s["id"]);
    const isCurrentChecked = getInputElement(s).checked;
    if (isInitialChecked && !isCurrentChecked) cancelScheduleIds.push(s["id"]);
    if (!isInitialChecked && isCurrentChecked) addScheduleIds.push(s["id"]);
  }
  return [cancelScheduleIds, addScheduleIds];
}
