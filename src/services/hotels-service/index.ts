import { notFoundError } from '../../errors';
import { PaymentRequired } from '../../errors/payment-required-error';
import enrollmentRepository from '../../repositories/enrollment-repository';
import hotelsRepository from '../../repositories/hotels-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function checkRequirements(userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  } else if (
    ticket.status !== 'PAID' ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  ) {
    throw PaymentRequired();
  }

  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) {
    throw notFoundError();
  }

  if (hotels.length > 0) return hotels;
}

async function getHotels(userId: number) {
  const result = await checkRequirements(userId);

  return result;
}

async function getHotelById(userId: number, hotelId: number) {
  await checkRequirements(userId);
  const hotel = await hotelsRepository.getHotelById(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelsService = { getHotels, getHotelById };

export default hotelsService;
