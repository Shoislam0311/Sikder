import { db } from "@/lib/db";
import { ROOMS } from "@/lib/resort-data";

async function seed() {
  console.log("🌱 Seeding rooms...");
  for (const room of ROOMS) {
    await db.room.upsert({
      where: { slug: room.slug },
      update: {
        name: room.name,
        price: room.price,
        size: room.size,
        capacity: room.capacity,
        description: room.description,
        image: room.image,
        amenities: room.amenities.join("|"),
        featured: room.featured,
      },
      create: {
        slug: room.slug,
        name: room.name,
        price: room.price,
        size: room.size,
        capacity: room.capacity,
        description: room.description,
        image: room.image,
        amenities: room.amenities.join("|"),
        featured: room.featured,
      },
    });
    console.log(`  ✓ ${room.name}`);
  }
  console.log("✅ Seeded", ROOMS.length, "rooms");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
