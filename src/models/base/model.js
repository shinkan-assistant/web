class BaseModel {
  constructor(data, do_update=false) {
    this.do_update = do_update;
    this.assertValid(data);
    this.data = data;
  }

  assertValid(data) {
    for (const field of this.fields) {
      field.assertValid(data[field.name]);
    }
  }
}