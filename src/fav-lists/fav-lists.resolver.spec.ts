import { Test, TestingModule } from '@nestjs/testing';
import { FavListsResolver } from './fav-lists.resolver';

describe('FavListsResolver', () => {
  let resolver: FavListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavListsResolver],
    }).compile();

    resolver = module.get<FavListsResolver>(FavListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
