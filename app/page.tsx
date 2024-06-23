import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "@/components/icons";

export default function Home() {
  const searchInput = (
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
      placeholder="Search..."
      size="lg"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      variant="bordered"
    />
  );

  return (
    <section className="flex flex-col justify-start h-full flex-grow md:pt-10 md:pb-5">
      {searchInput}
      <div className="border-3 mt-10 border-solid h-full border-red-900">
        This section will contain the movie list
      </div>
    </section>
  );
}
