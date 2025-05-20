import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as _ from 'lodash';
import { Nullable } from 'src/common/type-aliases';
import { Account } from '../types/\baccount.type';

@Injectable({ scope: Scope.REQUEST })
export class AuthApiService {
  private readonly apiBaseUrl = 'http://localhost:3001/auth';

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

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
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `${(this.request.headers?.authorization as string) ?? ''}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        body = (await response.json()) as ReturnType;
      } else {
        throw new Error(`Failed to call AUTH API: ${response.statusText}`);
      }
    } catch (e) {
      console.error(e);
    }

    return body;
  }

  async getAccount(accountId: string): Promise<Account> {
    const account = await this.callAuthApi<Account, Account>(
      '/account/' + accountId,
      'GET',
    );
    if (!account) {
      throw new NotFoundException('계정을 찾을수 없습니다.');
    }
    return account;
  }
}
