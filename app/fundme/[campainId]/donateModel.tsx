import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { CampaignInfo } from "./type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { DonationSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { HandCoinsIcon } from "lucide-react";
import { Address, parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { campaignAbi } from "@/web3/contracts/abi/campaign";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "@/components/molecule/loader";

const DonateModel = ({
  info,
  address,
  refetch,
}: {
  info: CampaignInfo;
  address: Address;
  refetch: () => void;
}) => {
  const form = useForm<z.infer<typeof DonationSchema>>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      amount: 1,
    },
  });

  const [open, setOpen] = useState(false);

  const { isPending, writeContract, data: hash } = useWriteContract({});

  function onSubmit(data: z.infer<typeof DonationSchema>) {
    writeContract({
      address: address,
      abi: campaignAbi,
      functionName: "deposite",
      value: parseEther(data.amount.toString()),
    });
  }

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (isTxSuccess) {
      toast({
        title: "Thank you",
        description: "you Have succefully donated towards the campaign 💝",
      });

      refetch();
      setOpen(false);
    }
  }, [isTxSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isPending && <Loader/>}
      <DialogTrigger asChild>
        <Button>Donate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col justify-center gap-2">
        <div className="flex gap-4 justify-start">
          <img
            src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${info.image}`}
            alt="campaignImage"
            className="object-cover"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <span>
              you are donating to<b> {info.title} </b>
            </span>
            <span className="text-xs">
              Your donation will benefit Martia Holloway
            </span>
          </div>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (In Eth)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || isTxLoading}>
              {" "}
              <HandCoinsIcon /> Donate
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModel;
