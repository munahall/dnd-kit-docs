import React, { useState } from "react";
import TextArea from "../../auto-resize-textarea";
import { usePageStore } from "@/hooks/use-page-store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Text({
  item,
  index,
  page,
}: {
  item: TextContent;
  index: number;
  page: Page;
}) {
  const [text, setText] = useState(item.data.text);
  const updatePage = usePageStore((state) => state.updatePage);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleTextChange = (newText) => {
    setText(newText);

    const updatedContent = [...page.content];
    updatedContent[index].data.text = newText;

    updatePage(page._id, { content: updatedContent });
  };

  return (
    <div
      className="border border-stone-50 cursor-pointer"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <TextArea
        className="focus:outline-none w-full bg-transparent text-black dark:text-stone-300 resize-none"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
}
