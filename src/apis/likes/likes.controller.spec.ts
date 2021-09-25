import { Test, TestingModule } from '@nestjs/testing';
import { FavListsController } from './likes.controller';

describe('FavListsController', () => {
  let controller: FavListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavListsController],
    }).compile();

    controller = module.get<FavListsController>(FavListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
