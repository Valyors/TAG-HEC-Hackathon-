import { supabase } from "./supabase";
import { UserProfile } from "./types";

export const getUserProfile = async (address: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("address", address);
  if (error) {
    throw error;
  }
  return data[0];
};

export const getScans = async (address: string) => {
  const { data, error } = await supabase
    .from("scans")
    .select("*")
    .or(`scanner.eq.${address}`)
    .or(`scanned.eq.${address}`);
  if (error) {
    throw error;
  }
  return data;
};
