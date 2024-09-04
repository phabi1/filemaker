import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { forwardRef, Fragment } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Row } from "../../../shared/models/table.model";
import EditorTableValue from "./table/value";

export interface EditorTableProps {
  headers: { name: string; type: string }[];
  rows: Record<string, string>[];
}

export default function EditorTable({ headers, rows }: EditorTableProps) {
  const VirtuosoTableComponents: TableComponents<Row> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {headers.map((column) => (
          <TableCell
            key={column.name}
            variant="head"
            align={"left"}
            style={{ width: 200 }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.name}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Row) {
    return (
      <Fragment>
        {headers.map((column) => (
          <TableCell key={column.name} align={"left"}>
            <EditorTableValue value={row[column.name]} />
          </TableCell>
        ))}40
      </Fragment>
    );
  }

  return (
    <Paper style={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
