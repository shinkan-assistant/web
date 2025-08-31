export class ItemLinkInfo {
  #hrefFunc;
  #text;

  constructor({hrefFunc, text}) {
    this.#hrefFunc = hrefFunc;
    this.#text = text;
  }

  getItem({record}) {
    return {
      href: this.#hrefFunc({id: record["id"]}),
      text: this.#text,
    }
  }
}

export class SubNavInfo {
  constructor({href, text}) {
    this.href = href;
    this.text = text;
  }
}
