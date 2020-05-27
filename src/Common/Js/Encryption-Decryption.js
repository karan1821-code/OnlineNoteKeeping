import * as CryptoJS from 'crypto-js';
import * as constants from './constants';
import JSEncrypt from 'jsencrypt';
import config from '../config';
// var crypto = require("crypto");
const PK=constants.publickey;
// ************ For New Encryption *********** //


export function encryptionDataWithRandomKey(toEncrypt) {
    var secretPhrase = CryptoJS.lib.WordArray.random(8);
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    //aes key 128 bits (16 bytes) long
    var aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
        keySize: 128 / 32
    });
    //initialization vector - 1st 16 chars of userId
    var iv = CryptoJS.enc.Utf8.parse(config.guid.slice(0, 16));
    var aesOptions = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv };
    var aesEncTrans = CryptoJS.AES.encrypt(JSON.stringify(toEncrypt), aesKey, aesOptions);
    return aesEncTrans;

};


export function encryptHeader(aesEncTrans) {
    var rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(PK);
    console.log(aesEncTrans.key.toString());
    var rsaEncryptedAesKey = rsaEncrypt.encrypt(aesEncTrans.key.toString());
    return rsaEncryptedAesKey;
};

// ************ END *********** //


export function Encrypt(data, temp) {

    var jsonString = JSON.stringify(data);



    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonString), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });


    // return encodeURIComponent(encrypted);
    return temp ? encodeURIComponent(encrypted) : data;

}



export function decryptData(data) {

    var dataValue = decodeURIComponent(data);
    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');

    var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var jsonString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return jsonString;

}










