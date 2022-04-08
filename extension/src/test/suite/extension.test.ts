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
        teacherFilters: [{ type: "node", proficency: 3 }],
        value: "react",
      });
      expect(result).to.eql([
        { type: "node", proficency: 3 },
        { type: "react", proficency: 5 },
      ]);
    });
  });

  describe("updates array with the require proficiency", () => {
    it("updates proficiency to be equal to the input value", () => {
      const result = handleTechnologyProficiency({
        value: 10,
        technology: "node",
        teacherFilters: [
          { type: "node", proficency: 3 },
          { type: "postgres", proficency: 5 },
        ],
      });
      expect(result).to.eql([
        { type: "node", proficency: 10 },
        { type: "postgres", proficency: 5 },
      ]);
    });
  });
});
