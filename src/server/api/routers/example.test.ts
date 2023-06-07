import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../trpc";
import { appRouter, type AppRouter } from "../root";
import { it, expect } from "@jest/globals";

it("Should echo sent data in testing environment", async () => {
  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null })
  );

  const data: inferProcedureInput<AppRouter["example"]["hello"]> = {
    text: "test-text",
  };

  const response = await caller.example.hello(data);

  expect(response).toMatchObject({
    greeting: "Hello test-text in test environment",
  });
});
