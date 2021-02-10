const userData = {
    from: "",
    age: 0,
    name: "",
    color: "",
    vote: ""
};

function editData(field, value) {
    userData[field] = value;
}

function getData(field) {
    return userData[field];
}

function getAllData() {
    return userData;
}

module.exports = { editData, getData, getAllData };