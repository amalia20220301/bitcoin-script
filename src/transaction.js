const crypto=require('crypto')
const bs58=require('bs58')

function SHA256(buffer) {
    var hash = crypto.createHash("sha256");
    hash.update(buffer);
    return hash.digest()
}

function RIPEMD160(buffer) {
    var hash = crypto.createHash("ripemd160");
    hash.update(buffer);
    return hash.digest()
}

const public_key='02da8fa6a1290c376d1eb0a90be60bccd044620a9380a6c09e4a176937f2ece07a';
var hash160 = RIPEMD160(SHA256(Buffer.from(public_key,'hex'))); //20bytes
var buffer = Buffer.alloc(21);
buffer[0] = 0x00;
hash160.copy(buffer, 1); //000411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3
var address_buffer = Buffer.alloc(25);
buffer.copy(address_buffer);
var checksum = SHA256(SHA256(buffer));
checksum.copy(address_buffer, 21);
const address=bs58.encode(address_buffer)
console.log(`address: ${address}`);
console.log(`hash160 ${hash160.toString('hex')}`)

