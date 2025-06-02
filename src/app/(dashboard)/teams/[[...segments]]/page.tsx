import { auth } from "@/auth";
import { Employee, employeesCache, employeesDataSource } from "@/data/employees";
import { Teams, teamsDataSource, teamsCache } from "@/data/teams";
import { Crud, Edit, List } from "@toolpad/core";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments = [] } = await params;
  const session = await auth();
  const currentUrl =
    (await headers()).get("referer") || process.env.AUTH_URL || "http://localhost:3000";

  if (!session) {
    const redirectUrl = new URL("/auth/signin", currentUrl);
    redirectUrl.searchParams.set("callbackUrl", currentUrl);

    redirect(redirectUrl.toString());
  }

  // member crud
  if (segments.length >= 2 && (segments[1] === "new" || segments[1] === "edit")) {
    return (
      <>
        <Edit<Teams>
          dataSource={teamsDataSource}
          dataSourceCache={teamsCache}
          id={segments[0]}
          initialPageSize={25}
          defaultValues={{ itemCount: 1 }}
        />
        <List<Employee>
          dataSource={employeesDataSource}
          dataSourceCache={employeesCache}
          rootPath="/employees"
          initialPageSize={25}
          defaultValues={{ itemCount: 1 }}
        />
      </>
    );
  }

  return (
    <Crud<Teams>
      dataSource={teamsDataSource}
      dataSourceCache={teamsCache}
      rootPath="/teams"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
