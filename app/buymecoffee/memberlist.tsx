import { coffeeAbi } from "@/web3/contracts/abi/buymecoffee";
import React from "react";
import { Abi, Address } from "viem";
import { useReadContracts } from "wagmi";
import { blo } from "blo";
import { Loader } from "@/components/molecule/loader";
import { useParams } from "next/navigation";

const Memberlist = ({ members }: { members: number }) => {
  const params = useParams();
  const contractId = params.contractId as Address;

  const contractForm = Array.from({ length: Number(members) });
  const contracts = contractForm.map((_, index) => ({
    address: contractId as Address,
    abi: coffeeAbi as Abi,
    functionName: "members",
    args: [index],
  }));

  const { data, isLoading, error } = useReadContracts({
    contracts: contracts,
  });

  if(isLoading) return <Loader/>

  return (
    <div className=" m-auto  rounded-md flex flex-col gap-3">
      {members === 0 ? (
        <div className="text-c  enter">No members yet</div>
      ) : (
        <>
          {isLoading && <div>Loading...</div>}
          {data?.map(({ result }, key) => {
            const [name, message, from, timestamp] = result as Array<string>;
            return (
              <li
                className="flex border border-input p-4 gap-3 items-center  relative"
                key={key}
              >
                <img src={blo(from as Address)} className="rounded-full" title={from} />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold">{name}</h2>
                  <h3 className="font-normal"> {message} </h3>
                </div>
                <h5 className="text-xs absolute bottom-0 right-0 font-thin p-1 ">
                  {" "}
                  {new Date(parseInt(timestamp) * 1000).toLocaleDateString()}
                </h5>
              </li>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Memberlist;
