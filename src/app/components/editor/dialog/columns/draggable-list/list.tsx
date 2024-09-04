import { List } from "@mui/material";
import React, { FC } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import Item from "./item";

export type Props = {
  items: string[];
  onDragEnd: OnDragEndResponder;
  onItemRemove: (column: string) => void;
};

const DraggableList: FC<Props> = React.memo(
  ({ items, onDragEnd, onItemRemove }) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item: string, index: number) => (
                <Item
                  item={item}
                  index={index}
                  key={item}
                  onRemove={(column) => onItemRemove(column)}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default DraggableList;
