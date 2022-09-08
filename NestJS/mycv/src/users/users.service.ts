import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    // Same as below
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    
    // repo: Repository<User>;

    // constructor(repo: Repository<User>) {
    //     this.repo = repo;
    // }

    create(email: string, password: string) {
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    findOne(id: number) {
        if (!id) return null;
        return this.repo.findOne({
            where: {
                id: id
            }
        });
    }

    find(email: string) {
        return this.repo.find({
            where: {
                email: email
            }
        });
    }

    // Partial -> we can put object that have zero, one or all properties from User entity
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            // throw new Error('user not found');
            throw new NotFoundException('users not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            // throw new Error('user not found');
            throw new NotFoundException('users not found');
        }
        return this.repo.remove(user);
    }
}