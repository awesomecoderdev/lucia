import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RedirectIfAuthorized({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await validateRequest();
	if (session) redirect("/dashboard");

	return <>{children}</>;
}
