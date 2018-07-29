import { ErrorPagesModule } from './error-pages.module';

describe('ErrorPagesModule', () => {
  let errorPagesModule: ErrorPagesModule;

  beforeEach(() => {
    errorPagesModule = new ErrorPagesModule();
  });

  it('should create an instance', () => {
    expect(errorPagesModule).toBeTruthy();
  });
});
