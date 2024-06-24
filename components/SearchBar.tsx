import React from "react";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "@/components/icons";

interface Props {
  searchQuery: string;
  onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchQuery, onSearchQueryChange }: Props) => {
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
      value={searchQuery}
      variant="bordered"
      onChange={onSearchQueryChange}
    />
  );
};

export default SearchBar;
