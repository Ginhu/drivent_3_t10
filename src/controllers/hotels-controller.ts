import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import hotelsService from '../services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotels = await hotelsService.getHotels(userId);
    if (!hotels) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'PaymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotelId = Number(req.params.hotelId);
    if (!hotelId) console.log(hotelId);

    const hotel = await hotelsService.getHotelById(userId, hotelId);
    if (!hotel) {
      console.log('Aqui');
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'PaymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
