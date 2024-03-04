export interface ISimpleRule {
  urlFilter: string;
  permanentlyActive: boolean;
}
export interface IDistractionAttempt {
  id: string;
  focusMode: boolean;
  focusModeSessionId: string;
  simpleRules: ISimpleRule[];
  dateTime: number;
}
