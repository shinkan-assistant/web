import Repository from "./repository";

export default class Service {
  constructor({tableName}) {
    this.tableName = tableName
    this.repo = new Repository({tableName});
  }
}