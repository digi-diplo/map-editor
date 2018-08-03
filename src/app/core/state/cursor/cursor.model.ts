export enum CursorActions {
  Select = 'Select',
  Grab = 'Grab',
  Grabbing = 'Grabbing',
  AddingPoint = 'AddingPoint'
}

export interface CursorState {
  state: CursorActions;
}
