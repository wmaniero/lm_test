import { container } from 'core/ioc/ContainerContext';
import { IHTTPClientType } from 'core/CoreTypes';
import { IHTTPClient } from 'core/http/HttpClient';
import { GET_HOTELS } from 'constants/endpoints';
import { Hotel } from 'types/Hotel';

type GetHotelsResponseType = Hotel[];

export const getHotels = async () => {
  try {
    const httpClient = container.get<IHTTPClient>(IHTTPClientType);
    const data = await httpClient.get<GetHotelsResponseType>(GET_HOTELS);
    return data.data;
  } catch (error) {
    return null;
  }
};
