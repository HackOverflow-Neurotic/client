import {z} from 'zod';

export const submitQnaZ = z.array(z.object({
    questionId: z.string(),
    answer: z.string().min(2,{message: "Answer must be at least 2 characters long"}).max(100,{message: "Answer cannot be longer than 100 characters"})
})).length(2,{message: "You must answer all 2 questions"})