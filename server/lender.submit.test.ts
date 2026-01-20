import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("lender.submit", () => {
  it("successfully submits a valid lender form", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const validInput = {
      firmName: "Test Capital Partners",
      contactName: "John Doe",
      email: "john@testcapital.com",
      dealSizeRanges: ["$5M - $15M", "$15M - $30M"],
      preferredIndustries: ["Technology", "Healthcare"],
      debtTypes: ["Term Loan", "Revolver"],
    };

    const result = await caller.lender.submit(validInput);

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with missing required fields", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      firmName: "",
      contactName: "John Doe",
      email: "john@testcapital.com",
      dealSizeRanges: ["$5M - $15M"],
      preferredIndustries: ["Technology"],
      debtTypes: ["Term Loan"],
    };

    await expect(caller.lender.submit(invalidInput)).rejects.toThrow();
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      firmName: "Test Capital Partners",
      contactName: "John Doe",
      email: "invalid-email",
      dealSizeRanges: ["$5M - $15M"],
      preferredIndustries: ["Technology"],
      debtTypes: ["Term Loan"],
    };

    await expect(caller.lender.submit(invalidInput)).rejects.toThrow();
  });

  it("rejects submission with empty arrays", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      firmName: "Test Capital Partners",
      contactName: "John Doe",
      email: "john@testcapital.com",
      dealSizeRanges: [],
      preferredIndustries: ["Technology"],
      debtTypes: ["Term Loan"],
    };

    await expect(caller.lender.submit(invalidInput)).rejects.toThrow();
  });
});
