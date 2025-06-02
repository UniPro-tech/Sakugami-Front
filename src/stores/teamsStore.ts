import type { Teams } from "@/data/teams";

let teams: Teams[] = [
  {
    id: 1,
    name: "Team Alpha",
    customId: "TA-001",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: {
      id: 1,
      name: "Edward Perry",
      age: 25,
      joinDate: new Date().toISOString(),
      role: "Finance",
    },
    members: [],
  },
  {
    id: 2,
    name: "Team Beta",
    customId: "TB-002",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: {
      id: 2,
      name: "Josephine Drake",
      age: 36,
      joinDate: new Date().toISOString(),
      role: "Market",
    },
    members: [],
  },
  {
    id: 3,
    name: "Team Gamma",
    customId: "TG-003",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: {
      id: 3,
      name: "Michael Johnson",
      age: 29,
      joinDate: new Date().toISOString(),
      role: "Development",
    },
    members: [],
  },
];

export const getTeamsStore = () => teams;

export const setTeamsStore = (newTeams: Teams[]) => {
  teams = newTeams;
};
