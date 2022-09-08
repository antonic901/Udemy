import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({id , email: 'test@gmail.com', password: '1234'} as User); 
      },
      find: (email: string) => {
        return Promise.resolve([{id: 1, email, password: '1234'} as User]);
      },
      // remove: () => {},
      // update: () => {}
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@gmail.com')
  });

  it('findUser returns signle user with the given id', async () => {
    const user = await controller.findUser(1);
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with the given id cannot be found', async () => {
    fakeUsersService.findOne = () => null
    try {
      await controller.findUser(1);
    } catch (err) {
      // done();
    }
  });

  it('signIn updates session object and returns user', async () => {
    const session = {userId: -10};
    const user = await controller.signin(
      {email: 'test@gmail.com', password: 'kinzo'},
      session
    )

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  }); 
});