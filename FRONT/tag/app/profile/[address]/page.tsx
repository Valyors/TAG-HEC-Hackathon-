"use client";
import { ProviderContext } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile } from "@/lib/getData";
import { UserProfile } from "@/lib/types";
import { useContext, useEffect, useState } from "react";

export default function Profile({
  params,
}: {
  params: {
    address: string;
  };
}) {
  const {
    connected,
    wallet,
    userProfile,
    setUserProfile,
    connectWallet,
    getAddress,
  } = useContext(ProviderContext);

  const getProfile = async () => {
    setUserProfile!(await getUserProfile(params.address));
  };

  useEffect(() => {
    if (params.address !== "no-address") {
      getProfile();
    }
  }, []);

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

      {params.address === "no-address" || !userProfile ? (
        ""
      ) : (
        <div>
          <div className="pokedex_profil">
            <img
              className="photo_profil_pokedex"
              src={"https://robohash.org/" + params.address}
              alt="profil"
            />
            <div>
              <h1>{userProfile?.username}</h1>
              <h2 className="text-md text-white">{userProfile?.description}</h2>
              {userProfile?.added_address && (
                <h3 className="text-xs italic text-white">
                  {userProfile?.added_address?.slice(0, 5) +
                    "..." +
                    userProfile?.added_address?.slice(-5)}
                </h3>
              )}
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
