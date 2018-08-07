export enum EditorAction {
  SelectingArea = 'SelectingArea',
  GrabbingPoint = 'GrabbingPoint',
  MovingPoint = 'MovingPoint',
  AddingPoint = 'AddingPoint'
}

export interface EditorState {
  currentAction: EditorAction;
  debugMode: boolean;
}
