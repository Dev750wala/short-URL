const STRING = "QWERTYUIOPasdfghjklZXCVBNMqwertyuiopASDFGHJKLzxcvbnm";

function generateID(length) {
    var id = '';

    for(let i=0; i<length; i++) {
        let randomNum = Math.floor(Math.random()*52);
        id+=STRING[randomNum];
    }
    return id;
}

module.exports = {
    generateID,
}