import Link from "next/link";

import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";

import type { ActionResult } from "@/lib/form";

export default async function Page() {
	return (
		<>
			<h1>Create an account</h1>
			<Form action={signup}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</Form>
			<Link href="/login">Sign in</Link>
		</>
	);
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const hashedPassword = await new Argon2id().hash(password);

	try {
		const user = await db.user.create({
			data: {
				password: hashedPassword,
				username: username,
			},
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
	} catch (e) {
		console.log("e", e);
		return {
			error: "An unknown error occurred",
		};
	}
	return redirect("/");
}
