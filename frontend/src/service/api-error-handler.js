import { AxiosError } from 'axios';

export function handleApiError(error) {
  if (error instanceof AxiosError && error.response) {
    const { message, details } = error.response.data;

    let detailedMessages;
    detailedMessages = Array.isArray(message) ? message.join(' ') : message;

    if (details?.length) {
      const additionalMessages = details.map((detail) => detail.messages.join(' ')).join(' ');
      detailedMessages += ` ${additionalMessages}`;
    }

    return detailedMessages;
  }
  return 'An unexpected error occurred while communicating with the API.';
}
