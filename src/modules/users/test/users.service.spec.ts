import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { User } from '../entities/user.entity'
import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity'
import { CreateUserDto } from '../dto/create-user.dto'

describe('usersService', () => {
  let service: UsersService
  let userRepository: userRepositoryMock
  let shoppingCartRepository: Repository<ShoppingCart>

  class userRepositoryMock extends Repository<User> {}

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

  const mockUser: User = mockUsers[0]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        ConfigService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(ShoppingCart),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    userRepository = module.get<userRepositoryMock>(getRepositoryToken(User))
    shoppingCartRepository = module.get<Repository<ShoppingCart>>(
      getRepositoryToken(ShoppingCart),
    )
  })

  it('Servicios de Usuario', () => {
    expect(service).toBeDefined()
  })

  // TEST UNIT FIND ALL
  describe('findAll', () => {
    it('deberia listar todos los usuarios', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers)
      const users = await service.findAll()

      expect(users).toHaveLength(mockUsers.length)
      expect(userRepository.find).toHaveBeenCalled()
      expect(users).toEqual(mockUsers)
    })
  })

  // TEST UNIT CREATE
  describe('create', () => {
    it('deberia crear un usuario', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser)
      jest.spyOn(shoppingCartRepository, 'save').mockResolvedValue(null)

      const newUser: CreateUserDto = {
        name: 'jaider',
        birthDate: '2002-13-09',
        email: 'jaider@gmail.com',
        password: 'jaider13',
        country: 'colombia',
        adress: 'calle 62 carrera 18',
      }

      const createdUser = await service.create(newUser)

      expect(createdUser).toEqual(mockUser)
      expect(userRepository.save).toHaveBeenCalledWith(newUser)
    })
  })

  // TEST UNIT FIND BY ID
  describe('findById', () => {
    it('deberia buscar un usuario por id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)
      jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true)

      const id = '62f8899a-69e8-4acf-8126-8fb359ef848b'

      const user = await service.findOne(id)

      expect(userRepository.findOne).toHaveBeenCalled()
      expect(user).toEqual(mockUser)
      expect(user.id).toEqual(id)
    })
  })

  // TEST UNIT UPDATE
  describe('update', () => {
    it('deberia eliminar un usuario', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)
      jest.spyOn(userRepository, 'update').mockImplementation(jest.fn())

      const id = '62f8899a-69e8-4acf-8126-8fb359ef848b'
      const update = { name: 'jaider nieto', email: 'jaider13@gmail.com' }

      await service.update(id, update)

      expect(userRepository.findOne).toHaveBeenCalled()
      expect(userRepository.update).toHaveBeenCalled()
    })
  })

  // TEST UNIT DELETE
  describe('delete', () => {
    it('deberia eliminar un usuario', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser)
      jest.spyOn(userRepository, 'remove').mockResolvedValueOnce(null)
      jest.spyOn(shoppingCartRepository, 'delete').mockResolvedValueOnce(null)

      const id = '62f8899a-69e8-4acf-8126-8fb359ef848b'
      const user = await service.remove(id)

      expect(userRepository.remove).toHaveBeenCalled()
      expect(user).toEqual(mockUser)
    })
  })
})
