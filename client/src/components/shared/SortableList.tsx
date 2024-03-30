import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Trash2 } from "lucide-react";

/** Sortable Element */
const SortableItem = SortableElement<{ value: string, onDelete: (url: string) => void }>(({ value, onDelete }: {
    value: string; onDelete: (url: string) => void;
}) => (
    <div className="flex flex-col">
        <img src={value} alt="image" className="w-full h-[200px] shadow-md object-cover rounded-t-md" />
        <button
            type="button"
            className="flex justify-center items-center gap-1 bg-red-700 text-white py-1 px-2 rounded-b-md hover:bg-red-800"
            onClick={() => onDelete(value)}
        >
            <Trash2 size={16} />
            Delete
        </button>
    </div>
));

/** Sortable Container */

const SortableList = SortableContainer<{ items: string[], onDelete: (url: string) => void }>((
    { items, onDelete }: { items: string[], onDelete: (url: string) => void }) => {
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 min-h-[500px]">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} onDelete={onDelete} />
            ))}
        </div>
    )
});


export default SortableList;

