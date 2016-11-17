"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const crypto = require("crypto");
const argon2 = require("argon2");
const SALT_BYTES = 16;
const OPS_LIMIT = 4;
const MEM_LIMIT = 15; //33554432
const PARALLELISM = 1;
const ARGON_OPTIONS = {
    timeCost: OPS_LIMIT,
    memoryCost: MEM_LIMIT,
    parallelism: PARALLELISM,
    argon2d: false
};
function randomBytes(size) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buf) => {
            err ? reject(err) : resolve(buf);
        });
    });
}
function generateSessionId() {
    return randomBytes(18);
}
exports.generateSessionId = generateSessionId;
function generatePasswordHash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return argon2.hash(password, yield randomBytes(SALT_BYTES), ARGON_OPTIONS);
    });
}
exports.generatePasswordHash = generatePasswordHash;
function verifyPasswordHash(hash, password) {
    return argon2.verify(hash, password);
}
exports.verifyPasswordHash = verifyPasswordHash;
