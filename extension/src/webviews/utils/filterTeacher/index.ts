import type { TechnologyFilter, TechnologyTypes } from "../../../types";

export const handleTechnologyType = ({
  value,
  teacherFilters,
}: {
  value: TechnologyTypes;
  teacherFilters: TechnologyFilter;
}) => {
  if (!value) {
    return teacherFilters;
  }

  teacherFilters.push({
    type: value,
    proficency: 5,
  });

  teacherFilters = teacherFilters;

  return teacherFilters;
};
