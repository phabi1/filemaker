import { Link } from "react-router-dom";

export interface RecentFilesItemProps {
  path: string;
}

export default function RecentFilesItem({ path }: RecentFilesItemProps) {
  return (
    <div>
      <Link to={"/editor?url" + encodeURIComponent(path)}>{path}</Link>
    </div>
  );
}
