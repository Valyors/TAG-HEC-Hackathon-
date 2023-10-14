"use client";
import { ProviderContext } from "@/components/provider";
import { getScans } from "@/lib/getData";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
export default function Pokedex() {
  const { userProfile } = useContext(ProviderContext);
  const router = useRouter();
  const [scans, setScans] = useState([]);

  const get = async () => {
    setScans(await getScans(userProfile!.address));
  };

  useEffect(() => {
    if (userProfile?.address) {
      get();
    }
  }, [userProfile]);

  return (
    <div className="w-full">
      <div id="rechercher">
        <input
          className="barre_recherche"
          type="text"
          id="searchInput"
          placeholder="Rechercher"
        />
      </div>

      <div className="list-pokedex h-screen overflow-y-auto pb-20 mt-5">
        {scans.length > 0 &&
          scans.map((scan: any, index: number) => {
            return (
              <div
                onClick={() =>
                  router.push(
                    `/profile/${
                      scan.scanner === userProfile?.address
                        ? scan.scanned
                        : scan.scanner
                    }`
                  )
                }
                className="text-white bg-white/10 rounded-lg p-2 mb-2"
                key={index}
              >
                {
                  scan.scanner === userProfile?.address
                    ? "You scanned " + scan.scanned
                    : scan.scanner + " scanned you" // scan.scanner === userProfile?.address ? "You scanned " + scan.scanned : scan.scanner + " scanned you"
                }
              </div>
            );
          })}
        {scans.length === 0 && (
          <p className="text-center text-white">No scans yet</p>
        )}
      </div>
    </div>
  );
}
