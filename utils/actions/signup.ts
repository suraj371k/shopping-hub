"use server";
import { createClient } from "../supabase/server";

export async function signupUser(formData: {
  email: string;
  password: string;
  name: string;
  mobile: string;
  age: string;
}) {
  const { email, password, name, mobile, age } = formData;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  //insert profile data
  const { error: profileError } = await supabase.from("profile").insert({
    id: user?.id,
    name,
    mobile,
    age,
  });

  if (profileError) throw profileError;

  return user;
}
