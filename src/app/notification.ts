import { Deserializable } from "./deserializable";

export class Notification implements Deserializable{

    notification: string;
    whofrom: string;
    time: string;

    deserialize(input: any) {
        Object.assign(<any>this, input);

        return this;
    }
}
