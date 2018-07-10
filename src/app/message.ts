import { Deserializable } from "./deserializable";

export class Message implements Deserializable{

    message: string;
    whofrom: string;
    time: string;

    deserialize(input: any) {
        Object.assign(<any>this, input);

        return this;
    }
}
