import { getUserProfile } from "./getData";
import { supabase } from "./supabase";

export const createUserProfile = async (
  address: string,
  username?: string,
  description?: string,
  added_address?: string
) => {
  console.log({ test: await getUserProfile(address) });
  if ((await getUserProfile(address)) !== undefined) {
    return;
  }
  await supabase.from("profile").insert([
    {
      address,
      username,
      description,
      added_address,
    },
  ]);
};

export const newScan = async (scanner: string, scanned: string) => {
  await supabase.from("scans").insert([
    {
      scanner,
      scanned,
    },
  ]);
};
