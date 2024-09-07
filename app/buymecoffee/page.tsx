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
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { coffeeAbi, coffeeAddress } from "@/web3/contracts/abi/buymecoffee";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  buymeCoffeeFactoryAbi,
  buymeCoffeeFectoryAddress,
} from "@/web3/contracts/abi/buymeCoffeeFectory";
import { Address, isAddressEqual, zeroAddress } from "viem";
import Link from "next/link";
import AuthProvider from "@/provider/AuthProvider";
import { CircleCheck } from "lucide-react";
import { Loader } from "@/components/molecule/loader";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const BuyMeCoffeeFactory = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: buymeCoffeeFectoryAddress,
    abi: buymeCoffeeFactoryAbi,
    functionName: "getBMCAddressByUserAddress",
    args: [address],
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    writeContract({
      address: buymeCoffeeFectoryAddress,
      abi: buymeCoffeeFactoryAbi,
      functionName: "createBymeCoffee",
      args: [data.name],
    });
  }

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  console.log(isTxSuccess, isTxLoading, hash);

  useEffect(() => {
    if (isTxSuccess) {
      toast({
        description: "Congratulations your buymeCofee page is live 🎉",
      });
      refetch();
    }
  }, [isTxSuccess]);

  if (isLoading) return <Loader/>;

  const hasPage = data && !isAddressEqual(zeroAddress, data as Address);

  return (
    <AuthProvider>
      <div className="flex flex-col max-w-[500px] justify-center m-auto">
        {hasPage ? (
          <div className="flex flex-col gap-3 items-center justify-center h-[200px]">
            <CircleCheck width={48} height={48} color="#28a745"/>
            <h4 className="text-center">
              Hey you already have a buymecoffee page with connected Account.
               <Link href={`/buymecoffee/${data}`} className="text-blue-500 mx-3 underline">Click here</Link>
              to visit page.
            </h4>
          </div>
        ) : (
          <div className="flex flex-col gap-8 justify-center">
            <h1 className="self-center text-2xl font-bold">
              Create your own buy me coffee page
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-4 border border-input rounded-md space-y-6"
              >
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
                <Button type="submit" disabled={isPending || isTxLoading}>
                  Create page
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </AuthProvider>
  );
};

export default BuyMeCoffeeFactory;
