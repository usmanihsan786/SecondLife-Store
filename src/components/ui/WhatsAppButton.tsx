import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "./button";

type Props = {
  message?: string;
  children?: ReactNode;
  variant?: Parameters<typeof buttonClasses>[0];
  size?: Parameters<typeof buttonClasses>[1];
  className?: string;
};

export function WhatsAppButton({ message, children = "Contact on WhatsApp", variant = "primary", size = "lg", className = "" }: Props) {
  return (
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)}>
      <WhatsAppIcon size={19} />
      {children}
    </a>
  );
}
