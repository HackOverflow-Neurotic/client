import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { submitQnaZ } from "~/zod-schema";
export const QnaRouter = createTRPCRouter({
    submitAnswers: protectedProcedure
    .input(submitQnaZ)
        .mutation(async ({ctx,input}) => {
            const {user} = ctx.session;
            if(!user){
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to submit answers"
                })
            }
            const answers = await ctx.db.qNA.createMany({
                data: input.map(answer => ({
                    question: answer.questionId,
                    answer: answer.answer,
                    userId: user.id,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }))
            })
            return answers;
        })
})
