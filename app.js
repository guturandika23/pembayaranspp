const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 1200;

// vuew engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'guntur',
    password: '0000',
    database: 'pembayaran_spp'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

app.get('/', (req, res) => {
    koneksi.query('use pembayaran_spp', (err, hasil) => {
        if(err) throw err;
        res.render('login.hbs',{
            judulhalaman: 'DATA-DATA',
            data: hasil
        });
    });
});

app.get('/inputpembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('inputpembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

app.post('/inputpembayaran', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/inputpembayaran');
    }
    )
});

app.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/inputpembayaran');
         }
    )
});

app.get('/pembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('pembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

app.post('/pembayaran', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/inputpembayaran');
    }
    )
});

app.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pembayaran');
         }
    )
});

//logout
app.get('/logout', (req, res) => {
    koneksi.query('SELECT*FROM login', (err, hasil) => {
        if(err) throw err;
        res.render('logout.hbs',{
            judulhalaman: 'ppob',
            data: hasil
        });
    });
});
app.listen(port, () => {
    console.log(`app pembayaran_spp berjalan pada port ${port}`);
});