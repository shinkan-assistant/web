export const EventFilterEnum = Object.freeze({
  participating: "participating",
  registrable: "registrable",
  organizer: "organizer",
});

export const EventPageTypeEnum = Object.freeze({
  list: "list",
  apply: "apply",
  detail: "detail",
  detailUpdate: "detail-update",
  manage: "manage",
});

export function judgeFormPage(pageType) {
  return [EventPageTypeEnum.apply, EventPageTypeEnum.detailUpdate]
    .some(pt => pageType === pt);
}
