import { getRepositoryToken } from '@nestjs/typeorm';
import { AssetService } from '../asset.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Asset } from '../model/asset.entity';
import { AssetController } from '../asset.controller';
// import { UserRole } from 'src/modules/user/enum/user-role.enum';

describe('AssetController', () => {
  let assetController: AssetController;
  let assetService: AssetService;

  beforeEach(async () => {
    {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AssetController],
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
      assetController = module.get<AssetController>(AssetController);
    }
  });

  it('shold be defined', () => {
    expect(assetController).toBeDefined();
    expect(assetService).toBeDefined();
  });

  it('shold be defined', async () => {
    // const result = await assetController.create(
    //   {
    //     email: 'joao@email.com',
    //     name: 'joao',
    //     password: '123',
    //     role: UserRole.User,
    //     id: '1',
    //     portfolios: [],
    //   },
    //   { identifier: 'A01' },
    // );
    // const assetMock: Asset = {
    //   id: '1',
    //   identifier: 'A01',
    //   purchases: [],
    // };
    // jest.spyOn(assetService, 'create').mockResolvedValueOnce(assetMock);
    // expect(result).toBeDefined();
    // expect(assetService.create).toHaveBeenCalledTimes(1);
  });
});
