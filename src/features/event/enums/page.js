export const EventFilterEnum = Object.freeze({
  participating: "participating",
  apply: "apply",
  manage: "manage",
});

export const EventPageTypeEnum = Object.freeze({
  list: "list",
  apply: "apply",
  detail: "detail",
  detailEdit: "detail-edit",
  manage: "manage",
});

export class EventPageInfo {
  constructor(type) {
    this.type = type;

    this.isList = type === EventPageTypeEnum.list
    
    if (!this.isList) {
      this.isManage = [EventPageTypeEnum.manage].includes(type);
      this.isParticipant = !this.isManage;
      if (this.isParticipant) {
        this.isBeforeApplying = type === EventPageTypeEnum.apply;
        this.isAfterApplying = type !== this.isBeforeApplying;
        this.isFormForParticipant = [
          EventPageTypeEnum.apply, EventPageTypeEnum.detailEdit
        ].includes(type);
      }
    }
  }
}

export function judgeFormPageForParticipant(type) {
  return [EventPageTypeEnum.apply, EventPageTypeEnum.detailEdit]
    .includes(type);
}

export function judgePageForParticipant(type) {
  return [EventPageTypeEnum.detail, EventPageTypeEnum.detailEdit]
    .includes(type);
}
export function judgeManagePage(type) {
  return [EventPageTypeEnum.manage]
    .includes(type);
}
