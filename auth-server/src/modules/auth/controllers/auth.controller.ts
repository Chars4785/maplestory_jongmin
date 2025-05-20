import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccountDto } from '../dto/account.dto';
import { AuthenticationDto } from '../dto/authentication.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  // 회원가입
  @Post('signup')
  async signup(
    @Body() signupDto: CreateAccountDto,
  ): Promise<AuthenticationDto> {
    return this.authService.createAccount(signupDto);
  }

  // 로그인
  @Post('login')
  login(@Body() accountDto: AccountDto): Promise<{ token: string }> {
    return this.authService.getAccountByLoginIdAndPassword(accountDto);
  }

  @Get('account/:accountId')
  @UseGuards(AuthGuard)
  getAccount(@Param('accountId') accountId: string) {
    return this.authService.getAccount(accountId);
  }
}
