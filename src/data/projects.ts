"use client";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core/Crud";
import { z } from "zod";

// TODO: アトリビュートを整理する
export interface Project extends DataModel {
  id: number;
  name: string;
  customId: string;
  createdAt: EpochTimeStamp;
  updatedAt: EpochTimeStamp;
  owner: number;
}

const API_URL = "/api/projects";

export const projectsDataSource: DataSource<Project> = {
  fields: [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 140 },
    { field: "customId", headerName: "Custom ID", width: 180 },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      valueGetter: (value: string) => value && new Date(value),
      width: 180,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "dateTime",
      valueGetter: (value: string) => value && new Date(value),
      width: 180,
    },
    {
      field: "owner",
      headerName: "Owner",
      type: "number",
      width: 160,
    },
  ],
  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", paginationModel.page.toString());
    queryParams.append("pageSize", paginationModel.pageSize.toString());
    if (sortModel?.length) {
      queryParams.append("sort", JSON.stringify(sortModel));
    }
    if (filterModel?.items?.length) {
      queryParams.append("filter", JSON.stringify(filterModel.items));
    }

    const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: "GET",
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  getOne: async (projectId) => {
    const res = await fetch(`${API_URL}/${projectId}`);
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  createOne: async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  updateOne: async (projectId, data) => {
    const res = await fetch(`${API_URL}/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  deleteOne: async (projectId) => {
    const res = await fetch(`${API_URL}/${projectId}`, { method: "DELETE" });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  validate: z.object({
    id: z.number({ required_error: "ID is required" }),
    name: z.string({ required_error: "Name is required" }).nonempty("Name is required"),
    customId: z
      .string({ required_error: "Custom ID is required" })
      .nonempty("Custom ID is required"),
    createdAt: z.number({ required_error: "Created date is required" }),
    updatedAt: z.number({ required_error: "Updated date is required" }),
    owner: z.number({ required_error: "Owner is required" }),
  })["~standard"].validate,
};

export const projectsCache = new DataSourceCache();
