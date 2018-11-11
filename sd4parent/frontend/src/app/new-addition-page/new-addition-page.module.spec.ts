import { NewAdditionPageModule } from './new-addition-page.module';

describe('NewAdditionPageModule', () => {
  let newAdditionPageModule: NewAdditionPageModule;

  beforeEach(() => {
    newAdditionPageModule = new NewAdditionPageModule();
  });

  it('should create an instance', () => {
    expect(newAdditionPageModule).toBeTruthy();
  });
});
