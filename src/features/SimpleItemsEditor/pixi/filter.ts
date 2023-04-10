export class OutlineFilterInput {
  enabled = true;
  defaultValues = {
    size: 2,
    color: "#000000",
  };
  size = this.defaultValues.size;
  color = this.defaultValues.color;
}

export class ScaleFilterInput {
  defaultValues = {
    value: 0.8,
  };
  value = this.defaultValues.value;
}

export type FilterInputs = {
  outline: OutlineFilterInput;
  scale: ScaleFilterInput;
};

export function getDefaultFilterInputs() {
  return {
    outline: new OutlineFilterInput(),
    scale: new ScaleFilterInput(),
  };
}
