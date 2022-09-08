import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity"
import { BadRequestException } from "@nestjs/common";

// We just describe what this is 
describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        // Create a fake copy of the users service
        const users: User[] = [];
        fakeUsersService = {
            find: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email:string, password: string) => {
                const user = {id: Math.floor(Math.random() * 999999),email, password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        };
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ] 
        }).compile();
        service = module.get(AuthService);
    });

    it('can create an instance of auth service',async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('test@gmail.com', '1234');

        expect(user.password).not.toEqual('1234');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async (done) => {
        // fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'a', password: '1'} as User])
        await service.signup('test@gmail.com', '1234')
        try {
            const user = await service.signup('tests@gmail.com', '1234');
        } catch (err) {
            // expect(err).toBeInstanceOf(BadRequestException)
            done();
        }
    });

    it('throw if signin is called with an unused email', async (done) => {
        try {
            await service.signin('test@gmail.com', '1234')
        } catch (err) {
            done();
        }
    });

    it('throws if and invalid password is provided', async (done) => {
        fakeUsersService.find = 
            () => Promise.resolve([{email: 'test@gmail.com', password: '1234'} as User])
        try {
            await service.signin('test@gmail.com', '1234')
        } catch (err) {
            done()
        }
    });

    it('returns a user if correct password is provided', async () => {
        // fakeUsersService.find = 
        //     () => Promise.resolve([{email: 'test@gmail.com', password: 'ce24429a6464d71f.bd417a4bf8a26730a77667cc10b63e0626eb80587086b3a1d6350094cc9ae440'} as User])')
        await service.signup('test@gmail.com', 'kinzo')
        const user = await service.signin('test@gmail.com', 'kinzo')
        expect(user).toBeDefined();
    });
});