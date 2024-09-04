import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentFilesList from "../components/home/recent-files/list";
import { Di } from "../services/di";
import { RecentFilesService } from "../services/recent-files/recent-files.service";

export default function HomePage() {
  const navigate = useNavigate();
  const di = Di.instance;
  const recentFilesService = di.get<RecentFilesService>("recent-files");

  const [recentFiles, setRecentFiles] = useState<string[]>(
    recentFilesService.getFiles()
  );

  useEffect(() => {
    const subscription = recentFilesService.filesChanged.subscribe(() => {
      setRecentFiles(recentFilesService.getFiles());
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  const openFile = async () => {
    const filepath = await window.electron.openFile();
    if (!filepath) {
      return;
    }
    navigate("/editor?url=" + encodeURIComponent(filepath));
  };

  return (
    <div className={"h-svh flex justify-center items-center"}>
      <Stack flex="col">
        <div id="drop"></div>
        <Button variant="contained" onClick={openFile}>
          Open file
        </Button>
        {recentFiles.length > 0 && (
          <div>
            <div>- OR -</div>
            <RecentFilesList items={recentFiles}></RecentFilesList>
          </div>
        )}
      </Stack>
    </div>
  );
}
