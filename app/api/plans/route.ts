import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let country = searchParams.get("country") || "";
  console.log("country:", country);

  // Return empty array if no country is provided
  if (!country) {
    return NextResponse.json([], { status: 200 });
  }

  const countryFirstLetters = country.substring(0, 2).toUpperCase();
  console.log("countryFirstLetters:", countryFirstLetters);

  try {
    const providers = await prisma.provider.findMany();

    const allPlans = providers.flatMap((provider: { products: any[] }) =>
      provider.products.map((plan) => ({
        externalId: plan.externalId ?? "",
        providerName: plan.providerName?.displayName ?? "Unknown Provider",
        providerLogo: plan.providerName?.logo ?? "",
        displayName: plan.displayName ?? "",
        capacity: plan.capacity ?? 0,
        price: plan.price?.value ?? 0,
        currency: plan.price?.currency?.code ?? "USD",
        duration: plan.duration ?? 0,
        coverages: plan.coverages ?? [],
        networkSpeed: plan.networkSpeed ?? [],
        url: plan.url ?? "",
        metadata: plan.metadata ?? null,
        promoCode: plan.promoCode ?? null,
        phoneNumber: plan.phoneNumber ?? false,
        coverageType: plan.coverageType ?? "",
        inventoryCount: plan.inventoryCount ?? 0,
      }))
    );

    const filteredPlans = allPlans.filter((plan) => {
      const firstCoverage = plan.coverages[0];
      return firstCoverage === countryFirstLetters;
    });

    return NextResponse.json(filteredPlans, { status: 200 });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Error fetching providers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = await prisma.plan.create({
      data: {
        externalId: body.externalId,
        providerName: body.providerName,
        providerLogo: body.providerLogo,
        displayName: body.displayName,
        capacity: parseFloat(body.capacity),
        price: parseFloat(body.price),
        currency: body.currency,
        duration: parseInt(body.duration),
        coverages: body.coverages,
        networkSpeed: body.networkSpeed,
        url: body.url,
        metadata: body.metadata,
        promoCode: body.promoCode,
        phoneNumber: body.phoneNumber,
        coverageType: body.coverageType,
        inventoryCount: parseInt(body.inventoryCount),
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Error creating plan:", error);
    return NextResponse.json({ error: "Error creating plan" }, { status: 500 });
  }
}
