"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { coffeeAbi } from "@/web3/contracts/abi/buymecoffee";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MemberFormSchema } from "./validationSchema";
import { options } from "./constant";
import { Address, parseEther } from "viem";
import { useParams } from "next/navigation";


export const MemberForm = () => {
  const params = useParams();
  const contractId = params.contractId as Address;
  const form = useForm<z.infer<typeof MemberFormSchema>>({
    resolver: zodResolver(MemberFormSchema),
    defaultValues: {
      name: "",
      message: "",
      amount: "0.1",
    },
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  function onSubmit(data: z.infer<typeof MemberFormSchema>) {
    writeContract({
      address: contractId,
      abi: coffeeAbi,
      functionName: "buymeCoffee",
      args: [data.name, data.message],
      value: parseEther(data.amount),
    });
  }

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if(isTxSuccess){
        toast({
            title: "Thank you",
            description: "you are now a member 💝",
          });
          form.reset();
    }
   
  }, [isTxSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 border border-input rounded-md space-y-6  min-w-[50%]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What you want to say"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select amount to send</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                {
                    options.map((option, index) => (
                      <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))
                  }
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || isTxLoading}>
          Buy me a Coffee
        </Button>
      </form>
    </Form>
  );
};
