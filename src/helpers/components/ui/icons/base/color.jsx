class IconColor {
  constructor({enabled, disabled}) {
    this.enabled = enabled;
    this.disabled = disabled;
  }
}

export const blueColor = new IconColor({
  enabled: "text-blue-500", disabled: "text-blue-200"});

export const redColor = new IconColor({
  enabled: "text-red-500", disabled: "text-red-200"});

export const greenColor = new IconColor({
  enabled: "text-green-500", disabled: "text-green-200"});
