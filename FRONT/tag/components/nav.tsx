"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ProviderContext } from "./provider";
import { List, Camera, User } from "lucide-react";

export default function Nav() {
  const router = useRouter();
  const { getAddress } = useContext(ProviderContext);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState<"pokedex" | "scan" | "profile">("scan");

  getAddress!().then((address) => {
    setAddress(address);
  });

  return (
    <nav className="max-w-md bg-black/90 w-full justify-evenly text-purple-500 py-3">
      <a
        onClick={() => {
          router.push("/pokedex");
        }}
        className="cursor-pointer"
      >
        <List size={24} />
      </a>
      <a onClick={() => router.push("/scan")} className="cursor-pointer">
        <Camera />
      </a>
      <a
        onClick={() =>
          router.push(`/profile/${address ? address : "no-address"}`)
        }
        className="cursor-pointer"
      >
        <User size={24} />
      </a>
    </nav>
  );
}
