const fs = require("fs");


// buat folder data jika data belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}


// buat file json if not have file make it
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//Ambil semua data di Contact.json 
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contact = JSON.parse(file )
    return contact;
}

// cari contact di Contact.json berdasarakan nama
 const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.nama === nama);
    return contact;
}


// menuliskan / menimpa file contact.json dengan data yang baru
const saveContacts = (contact) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contact))
};

// menambahkan data Contact baru 
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts)
}

// Cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
};



module.exports = { loadContact, findContact, addContact, cekDuplikat };