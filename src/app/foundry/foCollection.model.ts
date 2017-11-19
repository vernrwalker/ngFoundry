import { foObject } from './foObject.model'
import { iObject } from './foInterface'

//we want foCollection to be observable

export class foCollection<T extends iObject> extends foObject {
    private _memberType;
    private _members: Array<T>;

    constructor(list: Array<T> = undefined) {
        super();
        this.myType = 'foCollection';

        this._members = new Array<T>();
        list && list.forEach(item => this.addMember(item));
    }

    isEmpty(): boolean {
        return this._members.length == 0;
    }

    get length() {
        return this._members.length;
    }

    get hasMembers(): boolean {
        return this.length > 0;
    }

    map(funct) {
        return this._members.map(funct);
    }

    findMember(name: string) {
        return this._members[0];
    }

    getMember(id) {
        return this._members[id]
    }

    addMember(obj: T) {
        this._members.push(obj);
    }

    removeMember(obj: T) {
        this._members.push(obj);
    }

    get members() {
        return this._members;
    }

    applyToSubComponents(func: (item:T) => {}, deep: boolean = true) {
        this.hasMembers && this.members.forEach(item => {
            func(item);
            deep && item.applyToSubComponents(func, deep);
        });
    }

    moveToTop(item: T) {
        let loc = this._members.indexOf(item);
        if (loc != -1) {
            this._members.splice(loc, 1);
            this._members.push(item);
        }
        return this._members;
    }
}