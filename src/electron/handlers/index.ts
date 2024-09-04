import dialogOpenFile from "./dialog-open-file";
import dialogSaveFile from "./dialog-save-file";
import fileRead from "./file-read";
import fileWrite from "./file-write";

export default function () {
  dialogOpenFile();
  dialogSaveFile();
  fileRead();
  fileWrite();
}
