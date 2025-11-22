import {
  ValidationPipe,
  ValidationPipeOptions,
  BadRequestException,
} from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (errors) => {
    const messages = errors.map((error) => ({
      field: error.property,
      errors: Object.values(error.constraints || {}),
    }));
    return new BadRequestException({
      message: 'Validation failed',
      errors: messages,
    });
  },
};

export const globalValidationPipe = new ValidationPipe(validationPipeOptions);
