import ContentTypeEnum from "./typeEnum";

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

  constructor({title, subTitle, subNavInfos}) {
    super({contentType: ContentTypeEnum.item});
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
