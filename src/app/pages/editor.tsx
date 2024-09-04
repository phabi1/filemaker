import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header, Row } from "../../shared/models/table.model";
import EditorDialogColumns from "../components/editor/dialog/columns";
import EditorTable from "../components/editor/table";
import { Di } from "../services/di";
import { RecentFilesService } from "../services/recent-files/recent-files.service";

export default function EditorPage() {
  const recentFilesService =
    Di.instance.get<RecentFilesService>("recent-files");

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isColumnsDialogOpen, setIsColumnsDialogOpen] = useState(false);

  const empty = useMemo(() => {
    return loading === false && total === 0;
  }, [loading, rows]);

  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    headers.map((header) => header.name)
  );

  const displayedHeaders = useMemo(() => {
    return headers.filter((header) => displayedColumns.includes(header.name));
  }, [headers, displayedColumns]);

  const displayedRows = useMemo(() => {
    if (Object.keys(filters).length > 0) {
      return rows.filter((row) => {
        return Object.entries(filters).every(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return [...rows];
  }, [rows, filters]);

  const saveFile = async () => {
    const filepath = await window.electron.saveFile();
    await window.electron.writeFile(filepath, {
      headers,
      rows,
    });
  };

  useEffect(() => {
    const url = searchParams.get("url");
    if (!url) {
      return;
    }

    setLoading(true);
    window.electron.readFile(url).then((content) => {
      setHeaders(content.headers);
      setRows(content.rows);
      setTotal(content.rows.length);
      setDisplayedColumns(content.headers.map((header: any) => header.name));
      setLoading(false);
    });

    recentFilesService.addFile(url);
  }, [searchParams]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <Link to={"/"}>
              <ArrowBackIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {total} rows
          </Typography>
          <Stack direction={"row"} gap={2}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="columns"
              onClick={() => setIsColumnsDialogOpen(true)}
            >
              <ViewColumnIcon />
            </IconButton>
            <IconButton onClick={() => saveFile()}>
              <SaveIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {loading && <div>Loading...</div>}
      {empty && <div>No data</div>}
      <EditorTable
        headers={displayedHeaders}
        rows={displayedRows}
      ></EditorTable>
      <EditorDialogColumns
        open={isColumnsDialogOpen}
        headers={headers}
        columns={displayedColumns}
        closed={(columns) => {
          setIsColumnsDialogOpen(false);
          setDisplayedColumns(columns);
        }}
      />
    </div>
  );
}
