import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 });

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let country = searchParams.get("country") || "";
  

  const cacheKey = `plans_${country}`;
  const cachedPlans = cache.get(cacheKey);
  if (cachedPlans) {
    return NextResponse.json(cachedPlans, { status: 200 });
  }

  if (!country) {
    return NextResponse.json([], { status: 200 });
  }

  const countryCode = country.toUpperCase();

  try {
    const providers = await prisma.provider.findMany();
    console.log(`Found ${providers.length} providers`);

    const allPlans = providers.flatMap((provider) => {
      return provider.products.map((plan: any) => ({
        externalId: plan.externalId,
        providerName: provider.name,
        providerLogo: plan.providerName?.logo || "",
        displayName: plan.displayName || "",
        capacity: typeof plan.capacity === 'number' ? plan.capacity : 0,
        price: plan.price?.value || plan.price || 0,
        currency: plan.price?.currency?.code || plan.currency || "USD",
        duration: plan.duration || 0,
        coverages: Array.isArray(plan.coverages) ? plan.coverages : [],
        networkSpeed: Array.isArray(plan.networkSpeed) ? plan.networkSpeed : [],
        url: plan.url || "",
        metadata: plan.metadata || null,
        promoCode: plan.promoCode || null,
        phoneNumber: Boolean(plan.phoneNumber),
        coverageType: plan.coverageType || "",
        inventoryCount: plan.inventoryCount || 0,
      }));
    });

    const filteredPlans = allPlans.filter((plan) => {
      return plan.coverages.some((coverage: string) => { // Explicitly type coverage as string
        const normalizedCoverage = coverage.toUpperCase();
        return normalizedCoverage === countryCode || 
               normalizedCoverage.startsWith(countryCode) ||
               countryCode.startsWith(normalizedCoverage);
      });
    });
    

    // Sort plans by price in ascending order
    const sortedPlans = filteredPlans.sort((a, b) => a.price - b.price);
   
    cache.set(cacheKey, sortedPlans);

    return NextResponse.json(sortedPlans, { status: 200 });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Error fetching providers" },
      { status: 500 }
    );
  }
}
