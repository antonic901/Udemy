import { Injectable } from "@nestjs/common";
import { readFileSync, readFile, writeFileSync } from "fs";

@Injectable()
export class MessagesRepository {
    findOne(id: string) {
        // const contents = await readFile('messages.json', 'utf8');
        const contents = readFileSync('messages.json', {encoding: 'utf8'})
        const messages = JSON.parse(contents);

        return messages[id];
    }

    findAll() {
        const contents = readFileSync('messages.json', {encoding: 'utf8'})
        const messages = JSON.parse(contents);

        return messages;
    }

    create(content: string) {
        const contents = readFileSync('messages.json', {encoding: 'utf8'})
        const messages = JSON.parse(contents);
        const id = Math.floor(Math.random() * 999);
        messages[id] = {id, content}
         writeFileSync('messages.json', JSON.stringify(messages));
    }
}