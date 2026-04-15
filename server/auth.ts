import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { Role } from "@prisma/client";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_dev");

export type SessionPayload = {
  id: string;
  email: string;
  role: Role;
};

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getCurrentUser(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as SessionPayload;
  } catch (err) {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export function hasRole(user: SessionPayload, roles: Role[]) {
  if (user.role === Role.ADMIN) return true;
  return roles.includes(user.role);
}

export async function requireRole(roles: Role[]) {
  const user = await requireAuth();
  if (!hasRole(user, roles)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}
