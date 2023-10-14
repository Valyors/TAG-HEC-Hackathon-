"use client";
import { ProviderContext } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { newScan } from "@/lib/addData";
import { getUserProfile } from "@/lib/getData";
import { UserProfile } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Link, Settings } from "lucide-react";
import Stat from "@/components/stat-component";

export default function Profile({
  params,
  searchParams,
}: {
  params: {
    address: string;
  };
  searchParams: {
    scan: string;
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
  const [reason, setReason] = useState("");
  const [test, setTest] = useState(0);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [tab, setTab] = useState(0);

  const getProfile = async () => {
    setUserProfile!(await getUserProfile(params.address));
  };

  const handleScan = async () => {
    if (searchParams.scan === "true") {
      try {
        setTimeout(() => {
          document.getElementById("click")?.click();
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveSettings = async () => {};

  useEffect(() => {
    if (test != 1) return;
    if (params.address !== "no-address") {
      handleScan();
    }
  }, [test]);

  useEffect(() => {
    if (params.address !== "no-address") {
      getProfile();
      setTest(1);
    }
  }, [userProfile]);

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
            <div className="relative">
              <h1>{userProfile?.username}</h1>
              <h2 className="text-md text-white">{userProfile?.description}</h2>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Settings
                    className="absolute bottom-0 left-[100px]"
                    size={24}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="w-10/12">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tell us a little bit about yourself
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input
                        className="mb-2"
                        placeholder="Username"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      ></Input>
                      <Input
                        className="mb-2"
                        placeholder="Description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></Input>
                      <Input
                        placeholder="Main Address"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      ></Input>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="nav-web">
            <span className="web2" onClick={() => setTab(0)}>
              Web2
            </span>
            <span className="web3" onClick={() => setTab(1)}>
              Web3
            </span>
          </div>

          {tab === 0 ? (
            <div>
              <div className="bg-white/10 rounded-xl p-3 px-5 my-5 flex items-center">
                <h1 className="mr-2">Twitter</h1>
                <Link size={15} className="mr-5" />
                <p className="ml-auto text-sm text-purple-500">Favorite</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 px-5 my-3 flex items-center">
                <h1 className="mr-2">Linkedin</h1>
                <Link size={15} />
              </div>
              <div className="bg-white/10 rounded-xl p-3 px-5 my-3 flex items-center">
                <h1 className="mr-2">Telegram</h1>
                <Link size={15} />
              </div>
              <div className="bg-white/10 rounded-xl p-3 px-5 my-3 flex items-center">
                <h1 className="mr-2">Discord</h1>
                <Link size={15} />
              </div>
            </div>
          ) : (
            <Stat address={"tz1SBmmQxuZV75oLSmfC9GkEmjYQUiXVzGc8"} />
          )}
          <AlertDialog>
            <AlertDialogTrigger id="click"></AlertDialogTrigger>
            <AlertDialogContent className="w-10/12">
              <AlertDialogHeader>
                <AlertDialogTitle>Why did you scan me?</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    placeholder="Optional reason"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  ></Input>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await newScan(userProfile.address, params.address, reason);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
