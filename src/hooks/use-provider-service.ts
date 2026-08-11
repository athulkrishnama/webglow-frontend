import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { API_ROUTES } from '../constants/api.constant';

export interface LocationData {
  type: string;
  coordinates: number[];
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface AvailabilityData {
  startDate: string;
  endDate: string;
}

export interface CreateProviderServiceData {
  title: string;
  category: string;
  pricePerDay: number;
  description: string;
  location: LocationData;
  contact?: string;
  availability?: AvailabilityData[];
  isActive?: boolean;
}

export const useCreateProviderService = () => {
  return useMutation({
    mutationFn: async (data: CreateProviderServiceData) => {
      const response = await api.post(API_ROUTES.PROVIDER_SERVICE.CREATE, data);
      return response.data;
    },
  });
};
