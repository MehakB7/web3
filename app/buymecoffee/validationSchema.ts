import { z } from "zod";
export const  MemberFormSchema = z.object({
    name: z.string().min(2,{"message":"Name should have atleast 2 characters"}).max(10,{"message":"Name should have atmost 10 characters"}),
    message: z.string().min(2,{"message":"Message should have atleast 2 characters"}),
    amount: z.enum(["0.1", "0.2", "0.5"], {
      required_error: "Please select the amount",
    }),
  });
  
