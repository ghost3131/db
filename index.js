const fs = require('fs')

class DB {

    constructor(){

    }

    /*
    yaz => set
    db.set('prefix', '!')
    <DB>.yaz('prefix', '!')
    */

    yaz(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz.")
        if (!değer) throw new TypeError("Değer Girmediniz.")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] = değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    /*
    bul => fetch/get
    db.fetch('prefix')
    <DB>.bul('prefix')
    */

    bul(veri){
        if (!veri) throw new TypeError("Veri Girmediniz.")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) throw new TypeError('YAZDIĞINIZ VERİ BULUNAMADI')
        return dosya[veri]
    }

    /*
    kontrol => has 
    db.has('prefix')
    <DB>.kontrol('prefix')
    */

    kontrol(veri){
        if (!veri) throw new TypeError("Veri Girmediniz.")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return dosya[veri] ? true : false 
    }

    /*
    sil => delete
    db.delete('prefix')
    <DB>.sil('prefix')
    */

    sil(veri){
        if (!veri) throw new TypeError("Veri Girmediniz.")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) throw new TypeError('YAZDIĞINIZ VERİ BULUNAMADI')
        delete dosya[veri]
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null , 2))
    }

    /*
    yedekle => backup
    db.backup('veri.json')
    <DB>.yedekle('veri')
    */

    yedekle(dosyaAdı){
        if (!dosyaAdı) throw new TypeError("Dosya Adı Girmediniz.")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))
    }

    /*
    topla => add
    db.add('puan', 5)
    <DB>.topla('puan', 5)
    */

    topla(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz.")
        if (typeof değer !== 'number') throw new TypeError("Değer için bir sayı giriniz.")
        if (!this.kontrol(veri)) throw new TypeError("Veri olarak girdiğiniz değer veritabanında bulunamadı")
        if (typeof this.bul(veri) !== 'number') throw new TypeError('Sayı ekleyeceğiniz değer sayı olmalıdır.')
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] += değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    /*
    çıkar => substr
    db.substr('puan', 5)
    <DB>.çıkar('puan', 5) 
    */

    çıkar(veri, değer) {
        if (!veri) throw new TypeError("Veri Girmediniz.")
        if (typeof değer !== 'number') throw new TypeError("Değer için bir sayı giriniz.")
        if (!this.kontrol(veri)) throw new TypeError("Veri olarak girdiğiniz değer veritabanında bulunamadı")
        if (typeof this.bul(veri) !== 'number') throw new TypeError('Sayı ekleyeceğiniz değer sayı olmalıdır.')
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] -= değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    /*
    sıfırla => -
    <DB>.sıfırla()
    */

    sıfırla(){
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return fs.writeFileSync('database.json', JSON.stringify({}, null, 2))
    }

}


module.exports = new DB()





//by ghost3131
