import { MatControlModule } from './form-control.module';

describe('FormControlModule', () => {
  let formControlModule: MatControlModule;

  beforeEach(() => {
    formControlModule = new MatControlModule();
  });

  it('should create an instance', () => {
    expect(formControlModule).toBeTruthy();
  });
});
