import { Test, TestingModule } from '@nestjs/testing';
import { FavListsService } from './fav-lists.service';

describe('FavListsService', () => {
  let service: FavListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavListsService],
    }).compile();

    service = module.get<FavListsService>(FavListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
