import React from "react";
import { Sheet } from "@mui/joy";
import { useRouter } from "next/router";
import TeamCard from "@/components/Users/TeamList/teamCard";

export default function TeamList() {
  const router = useRouter();
  return (
    <Sheet sx={{ padding: 2 }}>
      <TeamCard />
    </Sheet>
  );
}
