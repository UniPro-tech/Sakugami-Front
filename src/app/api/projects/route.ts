import { NextRequest, NextResponse } from "next/server";
import { getProjectsStore, setProjectsStore } from "@/projectsStore";
import type { Project } from "@/data/projects";
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

  const projectsStore = getProjectsStore();

  let filteredProjects = [...projectsStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredProjects = filteredProjects.filter((project) => {
        const projectValue = project[field];

        switch (operator) {
          case "contains":
            return String(projectValue).toLowerCase().includes(String(value).toLowerCase());
          case "equals":
            return projectValue === value;
          case "startsWith":
            return String(projectValue).toLowerCase().startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(projectValue).toLowerCase().endsWith(String(value).toLowerCase());
          case ">":
            return (projectValue as number) > value;
          case "<":
            return (projectValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredProjects.sort((a, b) => {
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
  const paginatedProjects = filteredProjects.slice(start, end);

  return NextResponse.json({
    items: paginatedProjects,
    itemCount: filteredProjects.length,
  });
}

export async function POST(req: NextRequest) {
  const body: Partial<OmitId<Project>> = await req.json();

  const projectsStore = getProjectsStore();

  const newProject = {
    id: projectsStore.reduce((max, project) => Math.max(max, project.id), 0) + 1,
    ...body,
  } as Project;

  setProjectsStore([...projectsStore, newProject]);

  return NextResponse.json(newProject, { status: 201 });
}
