import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthApiService {
  constructor(private readonly httpService: HttpService) {}
}
