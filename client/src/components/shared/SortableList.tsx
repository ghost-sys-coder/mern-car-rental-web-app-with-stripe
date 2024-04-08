import { Droppable, Draggable } from "react-beautiful-dnd";
import { Trash2 } from "lucide-react";


interface ISortableListProps {
    items: string[];
    onDelete: (url: string) => void;
}

interface ISortableItemProps {
    value: string;
    index: number;
    onDelete: (url: string) => void;
}

/** Sortable Container */
const SortableItem = ({value, index, onDelete}: ISortableItemProps) => {
    return (
        <Draggable key={value} draggableId={value} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className="flex flex-col"
                >
                    <img src={value} alt="Draggable item" className="w-full h-[200px] shadow-md object-cover rounded-t-md" />
                    <button
                        type="button"
                        className="flex justify-center items-center gap-1 bg-red-700 text-white py-1 px-2 rounded-b-md hover:bg-red-800"
                        onClick={()=> onDelete(value)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            )}
        </Draggable>
    )
}

const SortableList = ({ items, onDelete }: ISortableListProps) => {
    return (
        <Droppable droppableId="droppable-images">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 min-h-[500px]"
                >
                    {items.map((value, index) => (
                        <SortableItem
                            key={`item-${index}`}
                            value={value}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
       </Droppable>
   ) 
}


export default SortableList;

