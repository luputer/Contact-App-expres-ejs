const path = require('path')
const express = require('express');
const app = express();
const port = 3000;
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flast = require('connect-flash');



//expres validaator for validasi form 
const { query, validationResult, body, check, cookie} = require('express-validator');


// using expressLayout 
const expressLayout = require('express-ejs-layouts')
app.use(expressLayout)


// import loadContact
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contact');




app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, '/public')));
// parsing aplication
app.use(express.urlencoded({extended:true}));

// konfigurasi flat
app.use(cookieparser('secret'));
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}
))
app.use(flast());



app.get('/home', (req, res) => {
    res.render('home',{titel: 'halaman Home',
        layout:'layouts/mainlayout', 
    });
});



app.get('/about',(req, res) => {
    res.render('about',{
        layout: 'layouts/mainlayout',
        titel: 'halaman about '})
})


app.get('/contact',(req, res) => {
    // Load data from contact apps
    const contacts = loadContact()
    // console.log(contacts)

    res.render('contact',{
        layout: 'layouts/mainlayout',
        titel: 'halaman contact ',
        contacts,
        msg: req.flash('msg')

    })
})


// halaman from tambah data contact
app.get('/contact/add',(req, res) => {
    res.render('add-contact',{
        layout: 'layouts/mainlayout',
        titel: 'halaman add contact'
    })
})


//add validation
app.post('/contact',
    [body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat) {
                    throw new Error('Nama kontak sudah terdaftar !');
                }
                return true;
    }),
    check('email','Email tidak valid !').isEmail(),
    check('noHp','noHp tidak valid !').isMobilePhone('id-ID'),
]
,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('add-contact',{
            layout: 'layouts/mainlayout',
            titel: 'halaman contact',
            errors: errors.array()
        })
    } else {
        addContact(req.body);
        // kirimkan flast massage
        req.flash('msg', 'Data Kontak berhasil ditambahkan!');
        res.redirect('/contact')
    }
})

// halaman detail Contact
// fitur detail contact dengan faram
app.get('/contact/:nama',(req, res) => {
    // findContac from contact apps
    const contact = findContact(req.params.nama)
    console.log(contact)
    res.render('detail',{
        layout: 'layouts/mainlayout',
        titel: 'halaman contact',
        contact

    })
})



app.get('/',(req, res) => {
    res.render('tes',{
        layout: 'layouts/mainlayout',
        titel: 'halaman tes'
    })

})

// Add midlreware not found 404
// belum di implemntasikan
 app.get('*',(req, res) => {
    res.render('404',{
        layout: 'layouts/mainlayout',
        titel: 'Not found'
    })
 })

app.listen(port, () => {
    console.log(`EJS Running at http://localhost:${port}`);
});