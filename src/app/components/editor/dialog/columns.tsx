import { Close as CloseIcon } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  createFilterOptions,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Header } from "../../../../shared/models/table.model";
import DraggableList from "./columns/draggable-list/list";

export interface EditorDialogColumnsProps {
  open: boolean;
  headers: Header[];
  columns: string[];
  closed: (columns: string[]) => void;
}

const filter = createFilterOptions<string>();

export const reorder = (
  list: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ({
  open,
  headers,
  columns,
  closed,
}: EditorDialogColumnsProps) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => columns);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setVisibleColumns(columns);
  }, [columns]);

  const selectAll = () => {
    setVisibleColumns(headers.map((header) => header.name));
  };

  const deselectAll = () => {
    setVisibleColumns([]);
  };

  const close = () => {
    closed(visibleColumns);
    setValue("");
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(visibleColumns, source.index, destination.index);

    setVisibleColumns(newItems);
  };

  const onItemRemove = (column: string) => {
    setVisibleColumns(visibleColumns.filter((col) => col !== column));
  };

  const canAddColumn = useMemo(() => {
    return value && !visibleColumns.includes(value);
  }, [value, visibleColumns]);

  const addColumn = () => {
    if (value && !visibleColumns.includes(value)) {
      setVisibleColumns([...visibleColumns, value]);
      setValue("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6">Columns</Typography>
          <div>
            <IconButton onClick={() => close()}>
              <CloseIcon />
            </IconButton>
          </div>
        </Stack>
      </DialogTitle>
      <Box p={2} pt={0} className="h-full flex-1">
        <Stack direction={"column"} className="h-full">
          <ButtonGroup className="mb-2">
            <Button onClick={() => selectAll()}>All visible</Button>
            <Button onClick={() => deselectAll()}>All hide</Button>
          </ButtonGroup>
          <Stack direction={"row"} marginBottom={2} className="w-full">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={headers
                .filter(
                  (header) => visibleColumns.includes(header.name) === false
                )
                .map((header) => header.name)}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    {option}
                  </li>
                );
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Free solo with text demo" />
              )}
            ></Autocomplete>
            <Button onClick={() => addColumn()} disabled={!canAddColumn}>
              Add
            </Button>
          </Stack>
          <div className="max-h-full overflow-auto flex-shrink-0 h-60">
            <DraggableList
              items={visibleColumns}
              onDragEnd={onDragEnd}
              onItemRemove={onItemRemove}
            />
          </div>
        </Stack>
      </Box>
    </Dialog>
  );
}
