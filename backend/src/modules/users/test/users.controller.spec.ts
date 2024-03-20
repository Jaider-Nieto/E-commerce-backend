import { Test, TestingModule } from '@nestjs/testing'

import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ShoppingCart } from '../../../modules/shopping-cart/entities/shopping-cart.entity'

describe('usersService', () => {
  let userController: UsersController
  let userService: UsersService
  let userRepository: Repository<User>
  let shoppingCartRepository: Repository<ShoppingCart>

  const mockUsers: User[] = [
    {
      id: '62f8899a-69e8-4acf-8126-8fb359ef848b',
      name: 'jaider',
      birthDate: '2002-13-09',
      email: 'jaider@gmail.com',
      password: 'jaider13',
      country: 'colombia',
      adress: 'calle 62 carrera 18',
      shoppingCart: null,
      createAt: '2024-02-23T21:26:12.122Z',
      updateAt: '2024-02-23T21:26:12.122Z',
    },
    {
      id: '8cfa1d92-a918-47b6-9936-a2aeb64eb378',
      name: 'sofia',
      birthDate: '2003-31-05',
      email: 'sofia@gmail.com',
      password: 'sofia31',
      country: 'colombia',
      adress: 'calle 62 carrera 18',
      shoppingCart: null,
      createAt: '2024-02-23T21:26:53.550Z',
      updateAt: '2024-02-23T21:26:53.550Z',
    },
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ShoppingCart),
          useClass: Repository,
        },
      ],
    }).compile()

    userService = module.get<UsersService>(UsersService)
    userController = module.get<UsersController>(UsersController)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    shoppingCartRepository = module.get<Repository<ShoppingCart>>(
      getRepositoryToken(ShoppingCart),
    )
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(mockUsers)
      const result = await userController.findAll()

      expect(userService.findAll()).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })
  })
})
