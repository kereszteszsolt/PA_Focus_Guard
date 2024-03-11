export interface IAction {
  actionId: string;
  mdiIcon: string;
  tooltip: string;
  color: string;
  f: Function;
  vif?: { fieldName: string; value: string | number | boolean; func: (a: any,  b: any) => boolean };
}
