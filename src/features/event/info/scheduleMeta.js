import { getInputNameFromSchedule, judgeIsParticipating } from "../utils";

export default class ScheduleInfo {
  constructor(schedule, {pageInfo, myParticipant, formHook, belong}) {
    this.schedule = schedule;
    this.page = pageInfo;
    this.scheduleForParticipant = myParticipant?.schedules.find(ps => ps["id"] === schedule["id"]) ?? null;
    this.formHook = formHook;

    if (this.page.isManage) {
      this.disabled = false;
    } else {
      if (this.page.isFormForParticipant) {
        this.disabled = !formHook.inputValues[getInputNameFromSchedule(schedule)];
      } else {
        this.disabled = !judgeIsParticipating(schedule, {myParticipant});
      }
    }
  }
  
  getStatuses() {
    const allStatuses = [
      {fieldName: "cancel", title: "キャンセル済み"},
      {fieldName: "attendance", title: "出席済み"},
      {fieldName: "payment", title: "支払い済み"},
    ];
    return allStatuses.filter(
      status => this.scheduleForParticipant?.hasOwnProperty(status.fieldName)
    );
  }
}
