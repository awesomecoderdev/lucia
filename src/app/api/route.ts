import { lucia } from "@/lib/auth";

export async function GET(request: Request, response: Response) {
	const authorizationHeader = request.headers.get("Authorization");
	const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
	if (!sessionId) {
		return new Response(
			JSON.stringify({
				success: false,
				code: 401,
				message: "Unauthorized.",
				data: {
					headers: request.headers,
				},
			})
		);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	return new Response(
		JSON.stringify({
			success: true,
			code: 200,
			message: "Successfully Authorized.",
			data: {
				headers: request.headers,
				session,
				user,
			},
		})
	);
}
