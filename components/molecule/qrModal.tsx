import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, QrCode } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";

import QRCode from "react-qr-code";
import { Address } from "viem";

export function QrModal({ address }: { address: Address }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-ful bg-transparent h-full hover:bg-transparent flex gap-2 font-normal">
          <QrCode />
          Show QR Code
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col justify-center items-center gap-2">
        <DialogTitle className="hidden">QR Code</DialogTitle>
        <QRCode value={address} />
        <div className="flex gap-2 font-normal">
        {address}
        <CopyToClipboard text = {address}>
          <CopyIcon />
        </CopyToClipboard>
        </div>
      </DialogContent>
    </Dialog>
  );
}
