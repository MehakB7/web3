"use client";
import AuthProvider from "@/provider/AuthProvider";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { differenceInCalendarDays } from "date-fns";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { campaignFactoryAbi,campaignfactoryAddress } from "@/web3/contracts/abi/campaignFactory";

import { FundMeSchema } from "@/app/fundme/validationSchema";
import {
  CampaignType,
  endDayHelpText,
  options,
  typeHelpText,
} from "./constant";
import { DatePicker } from "@/components/molecule/datepicker";
import Link from "next/link";
import { Address,parseEther } from "viem";
import { Loader } from "@/components/molecule/loader";

const GoFundMe = () => {

  const [loading, setLoading] = React.useState(false);
  const [imageCid, setCid] = React.useState("");

  const form = useForm<z.infer<typeof FundMeSchema>>({
    resolver: zodResolver(FundMeSchema),
    defaultValues: {
      title: "Mehak need job in web3",
      description: "Hey there can you please donate",
      amount: 10,
      type: CampaignType.FIXED,
      image: new File([], ""),
      endDate:  new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      )
      },
  });

  const { writeContract, data: hash, isPending, error ,...rest} = useWriteContract();

  const onSubmit = async (data: z.infer<typeof FundMeSchema>) => {
    try {
      const info = JSON.stringify({title: data.title, description: data.description, image: imageCid});
      setLoading(true);
      const response = await fetch("/api/json", {
        method: "POST",
        body: info,
      });
      const result = await response.json();
      setLoading(false);
      const days = differenceInCalendarDays(data.endDate ,  new Date())
      writeContract({
        address: campaignfactoryAddress as Address,
        abi: campaignFactoryAbi,
        functionName: "createCampain",
        args: [result.IpfsHash, parseEther(data.amount.toString()), days, parseInt(data.type)],
      });
    } catch (e) {

    }
  };

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (isTxSuccess) {
      toast({
        title: "Campagin created successFully",
        description: "View Campaigns to check your campaign",
      });
    }
  }, [isTxSuccess]);


  const uploadImage = async (file: File|null) => {
    if(!file){
      setLoading(true);
      const response = await fetch("/api/files", {
        method: "DELETE",
        body: imageCid,
      });
      await response.json();
      setCid("");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setCid(result?.IpfsHash);
      setLoading(false);
    } catch (e) {
    }
  }

  return (
    <AuthProvider>
      { loading &&  <Loader/>}
      <div className="flex flex-col max-w-[500px] justify-center m-auto gap-3">
        <h1 className="text-2xl font-semibold text-center">
        {" Let's begin your fundraising journey"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 border border-input rounded-md space-y-6  min-w-[50%]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of the fundraiser</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target (in ETH)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Amount"
                      type="number"
                      pattern="\d*"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is the fundraiser about"
                      className="vertical"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
                      type="file"
                      onChange={(e) =>{
                        uploadImage( e.target.files ? e.target.files[0] : null);
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }  
                      }
                      className="file:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type of fundraiser</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                      defaultValue={field.value}
                    >
                      {options.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>{typeHelpText}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      disabled={{
                        after: new Date(
                          new Date().setMonth(new Date().getMonth() + 3)
                        ),
                        before: new Date(),
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{endDayHelpText}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || isTxLoading|| loading}  >
              Create the Campaign
            </Button>
          </form>
        </Form>
        <Button variant="ghost" asChild>
          <Link href="/fundme/history" target="_blank">
            View my campaigns{" "}
          </Link>
        </Button>
      </div>
    </AuthProvider>
  );
};

export default GoFundMe;
