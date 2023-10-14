"use client";
import { ProviderContext } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";

export default function Profile({
  params,
}: {
  params: {
    address: string;
  };
}) {
  const { connected, wallet, connectWallet, getAddress } =
    useContext(ProviderContext);

  return (
    <div>
      <div className="flex justify-center mt-5">
        {connected ? (
          <Button
            className="mx-auto bg-purple-700"
            onClick={async () => {
              await wallet!.disconnect();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="mx-auto bg-purple-700"
            onClick={async () => {
              await connectWallet!();
              window.location.href = `/profile/${await getAddress!()}`;
            }}
          >
            Login
          </Button>
        )}
      </div>

      {params.address === "no-address" ? (
        ""
      ) : (
        <div>
          <div className="pokedex_profil">
            <img
              className="photo_profil_pokedex"
              src="/Laury.webp"
              alt="profil"
            />
            <div>
              <h1>Laury Jacot</h1>
              <h2 className="text-md text-white">Web3 Marketing</h2>
              <h3 className="text-xs italic text-white">
                {params.address.slice(0, 5) + "..." + params.address.slice(-5)}
              </h3>
            </div>
          </div>

          <div className="nav-web">
            <span className="web2">Web2</span>
            <span className="web3">Web3</span>
          </div>
        </div>
      )}
    </div>
  );
}
