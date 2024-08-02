import { getRepositoryToken } from '@nestjs/typeorm';
import { AssetService } from '../asset.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Asset } from '../model/asset.entity';
import { Repository } from 'typeorm';

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: Repository<Asset>;

  beforeEach(async () => {
    {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssetService,
          {
            provide: getRepositoryToken(Asset),
            useValue: {
              findOne: jest.fn(),
              save: jest.fn(),
            },
          },
        ],
      }).compile();
      assetService = module.get<AssetService>(AssetService);
      assetRepository = module.get<Repository<Asset>>(
        getRepositoryToken(Asset),
      );
    }
  });

  it('shold be defined', () => {
    expect(assetService).toBeDefined();
    expect(assetRepository).toBeDefined();
  });

  it('shold be defined', async () => {
    const assetMock: Asset = {
      id: '1',
      identifier: 'A01',
      purchases: [],
    };
    jest.spyOn(assetRepository, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(assetRepository, 'save').mockResolvedValueOnce(assetMock);

    const asset = await assetService.create({ identifier: 'A01' });
    expect(assetRepository.findOne).toHaveBeenCalledTimes(1);
    expect(assetRepository.save).toHaveBeenCalledTimes(1);
    expect(asset.id).toBe('1');
    expect(asset.identifier).toBe('A01');
  });
});
