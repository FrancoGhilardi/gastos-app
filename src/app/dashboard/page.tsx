import { redirect } from "next/navigation";
import { getSessionServer } from "@shared/lib/auth";

export default async function DashboardPage() {
  const session = await getSessionServer();

  if (!session) redirect("/login");

  return <div className="p-4">Bienvenido, {session.user?.email}</div>;
}
