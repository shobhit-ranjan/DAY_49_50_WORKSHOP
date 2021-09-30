class AddressBookData {

    get id() { return this._id }
    set id(id) {
        this._id = id;
    }

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[A-Za-z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is Incorrect";

    }

    get number() { return this._number; }
    set number(number) {
        let numberRegex = RegExp('^([\\+]?91)?[6-9]{1}[0-9]{9}$')
        if (numberRegex.test(number))
            this._number = number;
        else throw "Number is Incorrect";
    }

    get address() { return this._address; }
    set address(address) {
        let addressRegex = RegExp('[a-zA-Z0-9]{3,}$')
        if (addressRegex.test(address))
            this._address = address;
        else throw "Address is Incorrect";

    }

    get city() { return this._city; }
    set city(city) {
        this._city = city;
    }

    get state() { return this._states; }
    set state(state) {
        this._state = state;
    }

    get zip() { return this._zip; }
    set zip(zip) {
        this._zip = zip;
    }


    toString() {
        return "id = " + this.id + ", name=" + this._name + ", number=" + this._number +
            ", address=" + this._address + ", city=" + this.city +
            ", zip=" + this._zip + ", states=" + this._state;
    }
}