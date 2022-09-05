import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {

    // same as below -> create public messageRepo attribute and assign it with received MessageRepository instance
    constructor(public messagesRepo: MessagesRepository) {}
    
    // messagesRepo: MessagesRepository;

    // constructor(messageRepo: MessagesRepository) {
    //     this.messagesRepo = messageRepo;
    // }

    findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }

    findAll() {
        return this.messagesRepo.findAll();
    }

    create(content: string) {
        return this.messagesRepo.create(content);
    }
}