import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
} from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { users } from "./data";

interface Ingredient {
  _id: string;
  text: string;
  // Add any other properties you have in 'item'
}

interface IngredientsListProps {
  items: Ingredient[];
}

export default function IngredientsList({ items }: IngredientsListProps) {
  const [values, setValues] = React.useState<Selection>(new Set<string>());

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1 "
        orientation="horizontal"
      >
        {arrayValues.map((value) => {
          const user = users.find((user) => `${user.id}` === `${value}`);
          // Make sure user is found before rendering
          if (user) {
            return <Chip key={value}>{user.name}</Chip>;
          }
          return null;
        })}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <div className="items-center flex justify-center">Ingredients:</div>
      <Listbox
        topContent={topContent}
        classNames={{
          base: "max-w-xs",
          list: "max-h-[300px] overflow-scroll scrollbar-hide",
        }}
        defaultSelectedKeys={[]}
        items={items}
        label="Assigned to"
        selectionMode="multiple"
        onSelectionChange={setValues}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item._id} textValue={item.text}>
            <div className="flex gap-2 items-center">
              {/* <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                src={item.avatar}
              /> */}
              <div className="flex flex-col">
                <span className="text-small">{item.text}</span>
                {/* Uncomment if you have an email property in your 'item' */}
                {/* <span className="text-tiny text-default-400">{item.email}</span> */}
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
