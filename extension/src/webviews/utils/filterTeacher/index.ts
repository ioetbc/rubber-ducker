import type {
  TechnologyTypes,
  ProficiencyTypes,
  TeacherFilters,
} from "../../../types";

// THIS IS FUNCTIONAL PROGRAMMING
// TRY AND MAKE IT OBJECT ORIENTATED

export const handleTechnologyType = ({
  value,
  teacherFilters,
}: {
  value: TechnologyTypes;
  teacherFilters: TeacherFilters;
}) => {
  if (!value) {
    return teacherFilters;
  }

  teacherFilters.technologies.push({
    type: value,
    proficency: 5,
  });

  teacherFilters = teacherFilters;

  return teacherFilters;
};

export const handleTechnologyProficiency = ({
  value,
  technology,
  currentFilters,
}: {
  value: ProficiencyTypes;
  technology: TechnologyTypes;
  currentFilters: TeacherFilters;
}) => {
  currentFilters.technologies.map((filter) => {
    if (filter.type === technology) {
      filter.proficency = value;
    }
  });

  return currentFilters;
};
