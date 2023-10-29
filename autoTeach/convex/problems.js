import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createProblem = mutation({
  args: { 
    id: v.string(), 
    name: v.string(), 
    title: v.string(), 
    subtitle: v.string(),
    criteria: v.string(),
    correctAnswer: v.string()
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("problems", args);
  },
});

export const getProblems = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("problems").collect();
  }
});