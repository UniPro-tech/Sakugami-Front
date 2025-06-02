import { NextRequest, NextResponse } from "next/server";
import { getTeamsStore, setTeamsStore } from "@/stores/teamsStore";
import type { Teams } from "@/data/teams";
import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { OmitId } from "@toolpad/core/Crud";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page: GridPaginationModel["page"] = Number(searchParams.get("page")) || 0;
  const pageSize: GridPaginationModel["pageSize"] = Number(searchParams.get("pageSize")) || 10;
  const sortModel: GridSortModel = searchParams.get("sort")
    ? JSON.parse(searchParams.get("sort")!)
    : [];
  const filterModel: GridFilterModel = searchParams.get("filter")
    ? JSON.parse(searchParams.get("filter")!)
    : [];

  const teamsStore = getTeamsStore();

  let filteredTeams = [...teamsStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredTeams = filteredTeams.filter((team) => {
        const teamValue = team[field];

        switch (operator) {
          case "contains":
            return String(teamValue).toLowerCase().includes(String(value).toLowerCase());
          case "equals":
            return teamValue === value;
          case "startsWith":
            return String(teamValue).toLowerCase().startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(teamValue).toLowerCase().endsWith(String(value).toLowerCase());
          case ">":
            return (teamValue as number) > value;
          case "<":
            return (teamValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredTeams.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if ((a[field] as number) < (b[field] as number)) {
          return sort === "asc" ? -1 : 1;
        }
        if ((a[field] as number) > (b[field] as number)) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedTeams = filteredTeams.slice(start, end);

  return NextResponse.json({
    items: paginatedTeams,
    itemCount: filteredTeams.length,
  });
}

export async function POST(req: NextRequest) {
  const body: Partial<OmitId<Teams>> = await req.json();

  const teamsStore = getTeamsStore();

  const newTeam = {
    id: teamsStore.reduce((max, team) => Math.max(max, team.id), 0) + 1,
    ...body,
  } as Teams;

  setTeamsStore([...teamsStore, newTeam]);

  return NextResponse.json(newTeam, { status: 201 });
}
