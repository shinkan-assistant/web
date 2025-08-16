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

export function judgeFormPageForParticipant(pageType) {
  return [EventPageTypeEnum.apply, EventPageTypeEnum.detailEdit]
    .includes(pageType);
}

export function judgePageForParticipant(pageType) {
  return [EventPageTypeEnum.detail, EventPageTypeEnum.detailEdit]
    .includes(pageType);
}
export function judgeManagePage(pageType) {
  return [EventPageTypeEnum.manage]
    .includes(pageType);
}
