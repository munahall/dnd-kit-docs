import React, { useEffect, useMemo } from "react";
import Text from "./Text"; // Adjust the import path based on your project structure
import { Page } from "@/types/page-type";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { usePageStore } from "@/hooks/use-page-store";

export default function EditorContent({ page }: { page: Page }) {
  const updatePage = usePageStore((state) => state.updatePage);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      const oldIndex = page.content.findIndex((item) => item.id === active?.id);
      const newIndex = page.content.findIndex((item) => item.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedContent = arrayMove(page.content, oldIndex, newIndex);
        updatePage(page._id, { content: updatedContent });
      }
    }
  };

  return (
    page.content && page.content.length > 0 && (
      <DndContext
        key={page._id}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={page.content.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {page.content.map((item, index) => (
            <Text key={item.id} item={item} index={index} page={page} />
          ))}
        </SortableContext>
      </DndContext>
    )
  );
}
