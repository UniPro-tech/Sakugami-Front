import { auth } from "@/auth";
import { Teams, teamsDataSource, teamsCache } from "@/data/teams";
import { Crud } from "@toolpad/core";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const currentUrl =
    (await headers()).get("referer") || process.env.AUTH_URL || "http://localhost:3000";

  if (!session) {
    const redirectUrl = new URL("/auth/signin", currentUrl);
    redirectUrl.searchParams.set("callbackUrl", currentUrl);

    redirect(redirectUrl.toString());
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
