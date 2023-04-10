import { FilterInputs } from "./filter";

export enum EditorEvent {
  FILTERS_CHANGE = "Editor.FILTERS_CHANGE",
}

export class FiltersChange extends Event {
  filters: FilterInputs;

  constructor(filters: FilterInputs) {
    super(EditorEvent.FILTERS_CHANGE);
    this.filters = filters;
  }
}
