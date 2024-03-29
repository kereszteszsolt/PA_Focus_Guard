export interface IDialogAction{
  key: string;
  name: string;
  clickHandler: Function;
  color?: string;
  disabled?: boolean;
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined;
  elevation?: number;
}
