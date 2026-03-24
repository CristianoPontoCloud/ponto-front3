export interface ErrorResponseDto {
  message: string;
  statusCode: number;
  path: string;
  timestamp: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  details?: string[] | Record<string, any>;
};

