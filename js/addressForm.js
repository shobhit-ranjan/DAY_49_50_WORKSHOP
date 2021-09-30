let isUpdate = false;
let addressBookObj = {};
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const number = document.querySelector('#number');
    const numberError = document.querySelector('.number-error');
    number.addEventListener('input', function() {
        if (number.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).number = number.value;
            numberError.textContent = "";
        } catch (e) {
            numberError.textContent = e;
        }
    });
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });


    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        console.log(e);
        return;
    }
}
const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._number = getInputValueById('#number');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zip = getInputValueById('#zip');

}


function createAndUpdateStorage() {
    let personList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (personList) {
        let addressBookData = personList.
        find(addData => addData._id == addressBookObj._id);
        if (!addressBookData) {
            personList.push(createAddressBookData());
        } else {
            const index = personList
                .map(addData => addData._id)
                .indexOf(addressBookData._id);
            personList.splice(index, 1, createAddressBookData(addressBookData._id));
        }
    } else {
        personList = [createAddressBookData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(personList));
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if (!id) addressBookData.id = createNewPersonId();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}


const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.number = addressBookObj._number;
    addressBookData.address = addressBookObj._address;
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zip = addressBookObj._zip;
    alert(addressBookData.toString());
}

const createNewPersonId = () => {
    console.log("in id method");
    let perID = localStorage.getItem("PersonID");
    perID = !perID ? 1 : (parseInt(perID) + 1).toString();
    localStorage.setItem("PersonID", perID);
    return perID;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name', ' ');
    setValue('#number', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editPer');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#number', addressBookObj._number);
    setValue('#address', addressBookObj._address);
    setValue('#city', addressBookObj._city);
    setValue('#state', addressBookObj._state);
    setValue('#zip', addressBookObj._zip);

}