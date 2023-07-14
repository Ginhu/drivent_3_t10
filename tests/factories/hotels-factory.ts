import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotels() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.lorem.words(3),
      updatedAt: faker.date.recent(1),
    },
  });
}

export async function createRooms(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.lorem.word(5),
      capacity: 4,
      hotelId: hotelId,
      updatedAt: faker.date.recent(),
    },
  });
}
