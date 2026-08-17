import { IncomingHttpHeaders } from "http";
import { describe, expect, test } from "vitest";

import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns the key from a well-formed header", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey abc123" };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  test("returns null when the authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when the scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer abc123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when the header has no value after the scheme", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when the header is empty", () => {
    const headers: IncomingHttpHeaders = { authorization: "" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("ignores anything after the key", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey abc123 xyz" };
    expect(getAPIKey(headers)).toBe("abc123");
  });
});
