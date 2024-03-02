import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthorizedMiddleware({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await validateRequest();

	if (!session) redirect("/login");

	return <>{children}</>;
}
