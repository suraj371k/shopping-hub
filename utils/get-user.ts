import { createClient } from "./supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUserIdentities();

  if (error) throw error;

  const user = data.identities;
  return user;
}
