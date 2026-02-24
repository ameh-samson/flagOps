import SearchInput from "@/components/SearchInput";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import FlagTableColumn from "./FlagTableColumn";
import type { FlagsViewProps } from "@/types";

const FlagsView = ({ flagsData }: FlagsViewProps) => {
  return (
    <section>
      <div className="flex items-center justify-between gap-2 mb-6">
        <SearchInput className=" bg-white border border-[#D1D5DB] rounded-md p-2 placeholder:text-sm placeholder:text-[#CCCCCC] text-subtext my-1 focus:outline-none focus:border-primary focus:ring-1 focus:ring-inset focus:ring-primary" />

        <Button
          type="button"
          id="create flag"
          className="w-fit h-10 flex items-center justify-center px-4 py-2.5 rounded-sm hover:bg-primary/90"
        >
          + Create Flag
        </Button>
      </div>

      <Table columns={FlagTableColumn} data={flagsData} />
    </section>
  );
};

export default FlagsView;
