import RecentFilesItem from "./item";

export interface RecentFilesListProps {
  items: string[];
}

export default function RecentFilesList({ items }: RecentFilesListProps) {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <RecentFilesItem path={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
