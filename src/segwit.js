import {bech32} from "bech32";
import * as crypto from "crypto";
const sha256Digest = crypto
    .createHash("sha256")
    .update(Buffer.from("02eda671693a645ea1ca910e0faac39c82f2c55fa6ec111ff8a58e7560231aef2b","hex"), "hex")
    .digest("hex");

const ripemd160Digest = crypto
    .createHash("ripemd160")
    .update(sha256Digest, "hex")
    .digest("hex");

const bech32Words = bech32.toWords(Buffer.from(ripemd160Digest, "hex"));
const words = new Uint8Array([0, ...bech32Words]);
const address = bech32.encode("bc", words);
console.log(address);
