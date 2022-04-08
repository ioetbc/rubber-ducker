import { describe, it } from "mocha";
import { expect } from "chai";

import {
  handleTechnologyType,
  handleTechnologyProficiency,
} from "../../webviews/utils/filterTeacher/index";

suite("filter teacher", () => {
  describe("returns teachers matching the correct filters", () => {
    it("should return a correctly shaped array", () => {
      const result = handleTechnologyType({
        teacherFilters: {
          technologies: [{ type: "react", proficency: 2 }],
          minStarRating: 4,
          teacherPrice: 200,
        },
        value: "node",
      });
      console.log("result", result);
      expect(result).to.eql({
        technologies: [
          { type: "react", proficency: 2 },
          { type: "node", proficency: 5 },
        ],
        minStarRating: 4,
        teacherPrice: 200,
      });
    });
  });

  describe("updates array with the require proficiency", () => {
    it("updates proficiency to be equal to the input value", () => {
      const result = handleTechnologyProficiency({
        value: 10,
        technology: "node",
        currentFilters: {
          technologies: [
            { type: "node", proficency: 3 },
            { type: "postgres", proficency: 5 },
          ],
          minStarRating: 4,
          teacherPrice: 200,
        },
      });
      expect(result).to.eql({
        technologies: [
          { type: "node", proficency: 10 },
          { type: "postgres", proficency: 5 },
        ],
        minStarRating: 4,
        teacherPrice: 200,
      });
    });
  });
});
