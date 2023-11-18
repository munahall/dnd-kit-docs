# Dnd-kit

## step 1 - installation : 
```console
npm i @dnd-kit/core @dnd-kit/utilities @dnd-kit/sortable
```

```tsx 
// any thing you want to wrap to make it dragable
<DndContext
        key={page._id} // optional but if we have more than one dragbale
        collisionDetection={closestCenter} // important
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={page.content.map((item) => item.id)} // an array of the ids of the main array
          strategy={verticalListSortingStrategy} // sort the list verticly
        >
          {page.content.map((item, index) => ( 
            <Text key={item.id} item={item} index={index} page={page} /> // this is the content see bellow how to implement it 
          ))}
        </SortableContext>
      </DndContext>

```

```tsx 
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

```
