import { cache } from "react";
import prisma from "./db";
import { unstable_cache } from "next/cache";
// Added request memoization cache,
// For nextjs cache use unstable_cache
const getTodos = unstable_cache(
  cache(async () => {
    await wait(2000);

    return prisma.todo.findMany();
  }),
  ["todos"]
);

export async function getUserTodos(userId: string | number) {
  await wait(2000);
  return prisma.todo.findMany({ where: { userId: Number(userId) } });
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
