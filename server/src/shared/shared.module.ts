import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration/configuration.service';
import { MapperService } from './mapper/mapper/mapper.service';
import { AuthService } from './auth/auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy/jwt-strategy.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, AuthService, JwtStrategyService],
  exports: [ConfigurationService, MapperService, AuthService],
  imports: [UserModule],
})
export class SharedModule {
}
