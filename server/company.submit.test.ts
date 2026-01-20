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

describe("company.submit", () => {
  it("successfully submits a valid company form", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const validInput = {
      companyName: "Test Manufacturing Inc",
      contactName: "Jane Smith",
      email: "jane@testmfg.com",
      industry: "Manufacturing",
      revenueRange: "$50M - $100M",
      interestReasons: ["Growth / Capex", "Acquisition"],
    };

    const result = await caller.company.submit(validInput);

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with missing required fields", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      companyName: "",
      contactName: "Jane Smith",
      email: "jane@testmfg.com",
      industry: "Manufacturing",
      revenueRange: "$50M - $100M",
      interestReasons: ["Growth / Capex"],
    };

    await expect(caller.company.submit(invalidInput)).rejects.toThrow();
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      companyName: "Test Manufacturing Inc",
      contactName: "Jane Smith",
      email: "not-an-email",
      industry: "Manufacturing",
      revenueRange: "$50M - $100M",
      interestReasons: ["Growth / Capex"],
    };

    await expect(caller.company.submit(invalidInput)).rejects.toThrow();
  });

  it("rejects submission with empty interest reasons array", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      companyName: "Test Manufacturing Inc",
      contactName: "Jane Smith",
      email: "jane@testmfg.com",
      industry: "Manufacturing",
      revenueRange: "$50M - $100M",
      interestReasons: [],
    };

    await expect(caller.company.submit(invalidInput)).rejects.toThrow();
  });
});
