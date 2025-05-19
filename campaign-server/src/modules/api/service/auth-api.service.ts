import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Nullable } from 'src/common/type-aliases';

@Injectable()
export class AuthApiService {
  private readonly apiBaseUrl = 'http://localhost:3000/api/v1/auth';
  private readonly apiKey = 'sparrow-api-key';

  joinUrlPath(baseUrl: string, path: string): string {
    return _.trimEnd(baseUrl, '/') + '/' + _.trimStart(path, '/');
  }

  private async callAuthApi<BodyType, ReturnType>(
    apiPath: string,
    method: 'GET' | 'PUT' | 'POST',
    data?: BodyType,
  ): Promise<Nullable<ReturnType>> {
    const url = this.joinUrlPath(this.apiBaseUrl, apiPath);
    let body: Nullable<ReturnType> = null;

    // 전송이 실패해도 에러를 throw 하지 않고 Sentry 에 로그만 남김.
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        body = (await response.json()) as ReturnType;
      } else {
        throw new Error(`Failed to call Sparrow API: ${response.statusText}`);
      }
    } catch (e) {
      console.error(e);
    }

    return body;
  }

  async getAccount(accountId: string): Promise<AccountDto> {
    return this.callAuthApi<AccountDto>('/accounts/' + accountId, 'GET');
  }
}
