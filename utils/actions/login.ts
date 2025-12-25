"use server";
import { createClient } from "../supabase/server";

export async function signInUser(formData: {
  email: string;
  password: string;
}) {
  const { email, password } = formData;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  return user;
}
