import type { Project } from "@/data/projects";

let projects: Project[] = [
  {
    id: 1,
    name: "Project Alpha",
    customId: "PA-001",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: 1,
  },
  {
    id: 2,
    name: "Project Beta",
    customId: "PB-002",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: 2,
  },
  {
    id: 3,
    name: "Project Gamma",
    customId: "PG-003",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: 3,
  },
];

export const getProjectsStore = () => projects;

export const setProjectsStore = (newProjects: Project[]) => {
  projects = newProjects;
};
