"use client";
import { ProviderContext } from "@/components/provider";
import { useState, useContext } from "react";

export default function Scan() {
  const { userProfile } = useContext(ProviderContext);

  return (
    <>
      {userProfile?.address && (
        <div className="h-full flex items-center flex-col justify-center">
          <h1 className="text-4xl mb-5 text-white font-bold">TAG ME!</h1>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
              process.env.NEXT_PUBLIC_URL +
              "profile/" +
              userProfile?.address +
              "?scan=true"
            }`}
          />
        </div>
      )}
    </>
  );
}
