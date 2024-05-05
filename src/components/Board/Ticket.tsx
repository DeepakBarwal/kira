"use client";
import { Draggable } from "@hello-pangea/dnd";

interface TicketProps {
  id: string;
  index: number;
  title: string;
  assignee: string;
  storyPoints: number | null;
}

const Ticket = (props: TicketProps) => {
  const { id, index, title, assignee, storyPoints } = props;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className="m-1 h-[200px] background-card p-3 rounded cursor-pointer relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{title}</div>
          {assignee && (
            <div className="absolute top-2 right-2 rounded-full background-avatar text-white h-10 w-10 text-sm flex items-center justify-center font-semibold">
              {assignee[0]}
            </div>
          )}
          {storyPoints && (
            <div className="absolute bottom-2 left-2 rounded-full background-box text-white h-7 w-7 text-sm flex items-center justify-center">
              {storyPoints}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export { Ticket };
