import { Global, Module } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from './configuration/configuration.model';

@Global()
@Module({
  providers: [MapperService, AuthService, JwtStrategyService],
  exports: [MapperService, AuthService],
  imports: [UserModule, ConfigurationModule],
})
export class SharedModule {
}
