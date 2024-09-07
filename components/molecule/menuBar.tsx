import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { Address } from "viem";
import { CheckIcon, ChevronDown, CopyIcon, LogOut, QrCode } from "lucide-react";
import { useDisconnect } from "wagmi";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { QrModal } from "./qrModal";
import { toast } from "../ui/use-toast";

const MenuBar = ({address}: {address:Address}) => {

  const {disconnect} = useDisconnect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg w-300px h-10 px-4 py-2 truncate flex justify-around items-center gap-2 border-input border">
        <div className="w-40 truncate">{address} </div>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56"> 
      <DropdownMenuLabel className="hover:bg-accent hover:text-accent-foreground" >
        <CopyToClipboard text = {address} onCopy={()=>toast({description:<div className="flex gap-1"><CheckIcon/>Address copied successfully. </div>})}>
          <div className="flex gap-2 font-normal">
           <CopyIcon />
           Copy Address
          </div>
        </CopyToClipboard>
      </DropdownMenuLabel>

      <DropdownMenuLabel className="hover:bg-accent hover:text-accent-foreground"  >
      <QrModal address = {address}/>
      </DropdownMenuLabel>
      <DropdownMenuLabel className= "text-red-700 hover:bg-accent hover:text-accent-foreground" onClick={()=> disconnect()}>
        <div className="flex gap-2 font-normal">
          <LogOut />
          Disconnect
        </div>
      </DropdownMenuLabel>   
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



export default MenuBar;
