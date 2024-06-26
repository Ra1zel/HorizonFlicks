import React, { useCallback, useState } from "react";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "@/styles/icons";
import { debounce } from "@/utils/utils";

interface Props {
  onSearchQueryChange: (value: string) => void;
}

const SearchBar = ({ onSearchQueryChange }: Props) => {
  const [value, setValue] = useState("");

  const debouncedChangeHandler = useCallback(
    debounce(onSearchQueryChange, 500),
    [],
  );

  const handleValueChange = (value: string) => {
    setValue(value);
    debouncedChangeHandler(value);
  };

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 rounded-none max-w-[750px]",
        input: "text-sm border-0",
        mainWrapper: "flex flex-row justify-center",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block rounded-none" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search for movies..."
      size="lg"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={value}
      variant="bordered"
      onChange={(event) => handleValueChange(event.target.value)}
    />
  );
};

export default SearchBar;
