import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/util";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

type SearchInputProps = {
  className?: string;
};

const SearchInput = ({ className }: SearchInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearch) {
      setSearchParams({ search: debounceSearch });
    } else {
      setSearchParams({});
    }
  }, [debounceSearch, setSearchParams]);

  return (
    <input
      type="text"
      aria-label="search"
      placeholder="Search by name or key..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={cn("p-2.5 rounded-sm border border-[#D1D5DB]", className)}
    />
  );
};

export default SearchInput;
