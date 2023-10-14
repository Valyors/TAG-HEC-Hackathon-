import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const DEFAULT_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

export const supabase = createClient(
  DEFAULT_SUPABASE_URL,
  DEFAULT_SUPABASE_KEY
);
