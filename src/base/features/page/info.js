import ContentTypeEnum from "../content/const/enums/type";

class PageInfoBase {
  constructor({contentType}) {
    this.contentType = contentType;
  }

  getItemContent() {
    return {
      type: this.contentType,
    }
  }
}

export class ListPageInfo extends PageInfoBase {
  #titleFunc;
  #itemLink;

  constructor({titleFunc, itemLink}) {
    super({contentType: ContentTypeEnum.list});
    this.#titleFunc = titleFunc;
    this.#itemLink = itemLink;
  }

  getItemContent({record}) {
    return {
      ...super.getItemContent(),
      title: this.#titleFunc({record}),
      itemLink: this.#itemLink.getItem({record}),
    }
  }
}

export class ItemPageInfo extends PageInfoBase {
  #title;
  #subTitle;
  #subNavInfos;

  constructor({isForManage, isAfterApplying, isForm, title, subTitle, subNavInfos}) {
    super({contentType: ContentTypeEnum.item});
    this.isForManage = isForManage;
    [this.isBeforeApplying, this.isAfterApplying] = [!isAfterApplying, isAfterApplying];
    this.isForm = isForm;

    this.#title = title;
    this.#subTitle = subTitle;
    this.#subNavInfos = subNavInfos;
  }

  getItemContent() {
    return {
      ...super.getItemContent(),
      title: this.#title,
      subTitle: this.#subTitle,
      subNavInfos: this.#subNavInfos,
    } 
  }
}
