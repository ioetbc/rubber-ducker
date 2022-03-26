import type { TechnologyFilter } from "../../../src/types";

export const handleTechnologyType = ({
  teacherFilters,
}: {
  teacherFilters: TechnologyFilter;
}) => {
  const technologySelected: any = document.getElementById("technologies");
  if (technologySelected) {
    teacherFilters.push({
      type: technologySelected.value,
      proficency: 5,
    });
    teacherFilters = teacherFilters;
  }
  return teacherFilters;
};
