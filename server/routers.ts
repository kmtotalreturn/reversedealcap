import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLenderSubmission, createCompanySubmission, getAllLenderSubmissions, getAllCompanySubmissions } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  lender: router({
    submit: publicProcedure
      .input(z.object({
        firmName: z.string().min(1, "Firm name is required"),
        contactName: z.string().min(1, "Contact name is required"),
        email: z.string().email("Valid email is required"),
        dealSizeRanges: z.array(z.string()).min(1, "Select at least one deal size range"),
        preferredIndustries: z.array(z.string()).min(1, "Select at least one industry"),
        debtTypes: z.array(z.string()).min(1, "Select at least one debt type"),
      }))
      .mutation(async ({ input }) => {
        await createLenderSubmission(input);
        return { success: true };
      }),
    
    list: publicProcedure.query(async () => {
      return await getAllLenderSubmissions();
    }),
  }),

  company: router({
    submit: publicProcedure
      .input(z.object({
        companyName: z.string().min(1, "Company name is required"),
        contactName: z.string().min(1, "Contact name is required"),
        email: z.string().email("Valid email is required"),
        industry: z.string().min(1, "Industry is required"),
        revenueRange: z.string().min(1, "Revenue range is required"),
        interestReasons: z.array(z.string()).min(1, "Select at least one reason"),
      }))
      .mutation(async ({ input }) => {
        await createCompanySubmission(input);
        return { success: true };
      }),
    
    list: publicProcedure.query(async () => {
      return await getAllCompanySubmissions();
    }),
  }),
});

export type AppRouter = typeof appRouter;
