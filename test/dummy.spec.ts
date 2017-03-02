import {Shouter} from "../src/ts/shouter";

describe("dummy test suite", () => {

    it("should simply pass", () => {
        expect(true).toBe(true);
    });
});

describe("Shouter", () => {
    let shouter: Shouter;

    beforeEach(() => {
        shouter = new Shouter();
    });

    it("should transform lowercase strings into uppercase", () => {
        expect(shouter.shout("lowercase")).toBe("LOWERCASE");
    });
});
