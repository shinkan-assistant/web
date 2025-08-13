export const EventFilterEnum = Object.freeze({
  participating: "participating",
  registrable: "registrable",
  organizer: "organizer",
});

export const EventPageTypeEnum = Object.freeze({
  list: "list",
  apply: "apply",
  detail: "detail",
  detailEdit: "detail-edit",
  manage: "manage",
});

export function judgeFormPage(pageType) {
  return [EventPageTypeEnum.apply, EventPageTypeEnum.detailEdit]
    .includes(pageType);
}

export function judgePageForParticipant(pageType) {
  return [EventPageTypeEnum.detail, EventPageTypeEnum.detailEdit]
    .includes(pageType);
}
