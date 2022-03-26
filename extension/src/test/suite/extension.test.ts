import { describe, it } from "mocha";
import { expect } from "chai";

import { handleTechnologyType } from "../../webviews/utils/filterTeacher/index";

suite("Extension Test Suite", () => {
  describe("Sample test", () => {
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
});
