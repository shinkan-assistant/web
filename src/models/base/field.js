class BaseField {
  constructor(name, {type, required}) {
    this.name = name;
    this.type = type;
    this.required = required;
  }

  assertValid(value) {
  }
}

class StrField extends BaseField {
  static defaults = {
    max_len: 1000,
  }

  constructor(name, {required, max_len}) {
    super(name, {type: String, required: required});
    this.max_len = max_len ?? 1000;
  }
}

class URLField extends StrField {
  constructor(name, {required}) {
    super(name, {required: required});
  }
}

class NumberField extends BaseField {
  constructor(name, {required}) {
    super(name, {type: Number, required: required});
  }
}

class BoolField extends BaseField {
  constructor(name, {required}) {
    super(name, {type: Boolean, required: required});
  }
}

class DateTimeField extends StrField {
  constructor(name, {required}) {
    super(name, {required: required});
  }
}

class EnumField extends StrField {
  constructor(name, {required, choices}) {
    super(name, {required: required});
    this.choices = choices;
  }
}

class ModelField extends BaseField {
  constructor(name, model_cls, {required}) {
    super({name, type: model_cls, required: required});
  }
}

class ArrayField extends BaseField {
  constructor(name, item_field_cls, {required}) {
    super(name, {required: required});
    this.item_field_cls = item_field_cls;
  }
}

class MapField extends BaseField {
  constructor(name, value_field_cls, {required}) {
    super(name, {required: required});
    this.value_field_cls = value_field_cls;
  }
}
