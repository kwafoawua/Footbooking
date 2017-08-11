import { Field } from './field';
import { ClubService } from './club-service';
import { SocialMedia } from './social-media';
export class Club {
    name: string;
    address: string;
    phoneNumber: number;
    fields: Field ;
    services: ClubService;
    username: string;
    password: string;
    role: String;
    socialMedia: SocialMedia;
    
   /* constructor (name: string, address: string, phoneNumber : number, username: string, password: string) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.role = 'complejo';
        this.fields = null;
        this.services = null;
        this.socialMedia = null;
    }*/
    constructor () {
        this.name = '';
        this.address = '';
        this.phoneNumber = null;
        this.username = '';
        this.password = '';
        this.role = 'complejo';
        this.fields = null;
        this.services = null;
        this.socialMedia = null;
    }
}
