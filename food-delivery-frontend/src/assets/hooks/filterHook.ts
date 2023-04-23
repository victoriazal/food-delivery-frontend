import { useState } from "react";

export const useFilter = () => {

  // render filter options
  const showFilterOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filterOptionsElem = document.querySelector('.home-page_filter-options');
    filterOptionsElem?.classList.toggle('show-options');
  };
  // filter based on the short description
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const handleFilterOption = (filter: string, e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget?.classList.contains('selected')
      ? setSelectedFilters(prevFilters => prevFilters.filter(option => option !== filter))
      : setSelectedFilters(prevFilters => [...prevFilters, filter]);
    e.currentTarget?.classList.toggle('selected');
  };

  return { selectedFilters,handleFilterOption, showFilterOptions};
};