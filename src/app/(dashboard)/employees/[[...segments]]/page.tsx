import * as React from "react";

import { Crud } from "@toolpad/core/Crud";
import { employeesDataSource, Employee, employeesCache } from "@/data/employees";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";

export default async function EmployeesCrudPage() {
  const session = await auth();
  const currentUrl =
    (await headers()).get("referer") || process.env.AUTH_URL || "http://localhost:3000";

  if (!session) {
    const redirectUrl = new URL("/auth/signin", currentUrl);
    redirectUrl.searchParams.set("callbackUrl", currentUrl);

    redirect(redirectUrl.toString());
  }

  return (
    <Crud<Employee>
      dataSource={employeesDataSource}
      dataSourceCache={employeesCache}
      rootPath="/employees"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
