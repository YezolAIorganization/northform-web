import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null;

  return (
    <NavbarClient
      user={
        user
          ? {
              id: user.id,
              fullName,
            }
          : null
      }
    />
  );
}