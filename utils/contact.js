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
    contact.nama.trim();
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts)
}

// Cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
};


 const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);

    saveContacts(filteredContacts);
    // console.log(filteredContacts)
 }



//  mengubah kontak 
const updateContact = (contactBaru) =>{
    const contacts = loadContact();
    // hilangkan kontak nama yang namanya sama denagan anam lama
    const filteredContacts = contacts.filter((contact) => contact.nama !== 
    contactBaru.oldNama);

    // hapus Obeject oldBaru;
    delete contactBaru.oldNama;
    // console.log(filteredContacts, contactBaru);
    // masukan ke contact baru
    filteredContacts.push(contactBaru);
    // timpa ke kontak
    saveContacts(filteredContacts); 

}


module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact,  updateContact };