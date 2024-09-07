import { z } from "zod";
import { CampaignType } from "./constant";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/webp", ];

export const  FundMeSchema = z.object({
    title: z.string().min(5,{"message":"Title should have atleast 5 characters"}).max(100,{"message":"Title should have atmost 100 characters"}),
    description: z.string().min(20,{"message":"Message should have atleast 20 characters"}),
    amount: z.preprocess((val) => Number(val), z.number().gt(5, {message:"Amount should be greater than 5"})),
    type : z.nativeEnum(CampaignType, {
        required_error: "Please select the Type",
    }),
    image: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, { // Max file size: 5MB
      message: "Image size should be less than 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpeg, .png, and .gif formats are supported",
    }),
    endDate: z.date().refine((date) => date > new Date(), "End date should be in future"),
  });


  export const  DonationSchema = z.object({
    amount: z.preprocess((val) => Number(val), z.number().gt(0, {message:"Amount should be greater than 0"})),
  })
  