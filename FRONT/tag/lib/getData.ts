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
