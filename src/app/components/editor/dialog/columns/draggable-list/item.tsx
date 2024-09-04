import { Remove as RemoveIcon } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

export type Props = {
  item: string;
  index: number;
  onRemove: (column: string) => void;
};

const DraggableListItem: FC<Props> = ({ item, index, onRemove }) => {
  return (
    <Draggable draggableId={item} index={index}>
      {(provided) => (
        <Tooltip title="Drag Me!">
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <RemoveIcon onClick={() => onRemove(item)} />
              </IconButton>
            }
            disablePadding
          >
            <ListItemText primary={item} />
          </ListItem>
        </Tooltip>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
