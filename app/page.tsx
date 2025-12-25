"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
