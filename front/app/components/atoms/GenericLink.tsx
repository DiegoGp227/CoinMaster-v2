import { ReactNode } from "react";

interface IGenericLinkProps {
  href: string;
  Icon: ReactNode;
  text: string;
  active: boolean;
}

export default function GenericLink({
  href,
  Icon,
  text,
  active,
}: IGenericLinkProps) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-3 text-soft-gray hover:text-white hover:bg-hard-gray rounded-lg transition-all ${
        active ? "bg-hard-gray text-white" : ""
      }
    `}
    >
      {Icon}
      <span>{text}</span>
    </a>
  );
}
