import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(["COMMERCIAL", "PROFESSIONAL"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);
    const existing = await prismaClient.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    const passwordHash = await hash(data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role ?? "PROFESSIONAL",
        password: passwordHash,
      },
      select: { id: true, email: true, name: true, role: true },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "name" in error && (error as { name?: string }).name === "ZodError") {
      const zodError = error as { issues?: unknown };
      return NextResponse.json({ error: "Invalid input", details: zodError.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}


