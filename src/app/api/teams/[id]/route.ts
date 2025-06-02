import { NextRequest, NextResponse } from "next/server";
import { getTeamsStore, setTeamsStore } from "@/stores/teamsStore";
import type { OmitId } from "@toolpad/core/Crud";
import { Teams } from "@/data/teams";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: teamId } = await params;

  const teamsStore = getTeamsStore();

  const teamToShow = teamsStore.find((team) => team.id === Number(teamId));

  if (!teamToShow) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
  return NextResponse.json(teamToShow);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body: Partial<OmitId<Teams>> = await req.json();
  const { id: teamId } = await params;

  const teamsStore = getTeamsStore();

  let updatedTeam: Teams | null = null;

  setTeamsStore(
    teamsStore.map((team) => {
      if (team.id === Number(teamId)) {
        updatedTeam = { ...team, ...body };
        return updatedTeam;
      }
      return team;
    })
  );

  if (!updatedTeam) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
  return NextResponse.json(updatedTeam);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: teamId } = await params;

  const teamsStore = getTeamsStore();

  setTeamsStore(teamsStore.filter((team) => team.id !== Number(teamId)));

  return NextResponse.json({ success: true });
}
