const app = require("../../app.js");
const request = require("supertest");
const { setupDB } = require("./setup.js");

setupDB();

describe("Auth Controller", () => {
  describe("POST /signIn", () => {
    it("should create a new user and return token", async () => {
      const mockUser = {
        _id: "1",
        email: "test@test.com",
        displayName: "tester",
        photoURL: "testURL",
      };

      const response = await request(app).post("/auth/signIn").send(mockUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.result).toBe("ok");
      expect(response.body.message).toBe("login successful!");
      expect(response.body.user.email).toBe("test@test.com");
      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("GET /signOut", () => {
    it("should clear tokens", async () => {
      const response = await request(app).get("/auth/signOut");
      const cookie = response.headers["set-cookie"][0];

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("logout successful");
      expect(cookie).toMatch(/Expires=Thu, 01 Jan 1970 00:00:00 GMT/);
    });
  });
});
