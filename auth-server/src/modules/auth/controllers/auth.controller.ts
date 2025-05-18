import { Body, Controller, Post } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('signup')
  async signup(@Body() signupDto: CreateAccountDto): Promise<AccountDto> {
    return this.authService.createAccount(signupDto);
  }

  // 로그인
  @Post('login')
  login(@Body() accountDto: AccountDto) {
    return this.authService.getAccountByLoginIdAndPassword(accountDto);
  }
}
