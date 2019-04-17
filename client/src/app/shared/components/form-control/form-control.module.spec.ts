import { FormControlModule } from './form-control.module';

describe('FormControlModule', () => {
  let formControlModule: FormControlModule;

  beforeEach(() => {
    formControlModule = new FormControlModule();
  });

  it('should create an instance', () => {
    expect(formControlModule).toBeTruthy();
  });
});
