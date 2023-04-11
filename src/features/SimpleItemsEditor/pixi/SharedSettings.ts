export class OutlineInput {
  enabled = true;
  defaultValues = {
    size: 2,
    color: "#000000",
  };
  size = this.defaultValues.size;
  color = this.defaultValues.color;
}

export class ScaleInput {
  defaultValues = {
    value: 0.8,
  };
  value = this.defaultValues.value;
}

export type SharedSettings = {
  outline: OutlineInput;
  scale: ScaleInput;
};

export function getDefaultSharedSettings() {
  return {
    outline: new OutlineInput(),
    scale: new ScaleInput(),
  };
}
