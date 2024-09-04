export interface EditorTableValueProps {
  value: string;
}
export default function ({ value }: EditorTableValueProps) {
  return <div className={'text-nowrap text-truncate'}>{value}</div>;
}
