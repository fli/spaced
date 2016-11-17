"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const PgPromise = require("pg-promise");
const crypto_1 = require("./crypto");
const pgp = PgPromise();
const db = pgp({
    database: process.env.PGDATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER
});
function addNewPendingUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield crypto_1.generateSessionId();
        return db.tx(t => t.batch([
            t.none('SELECT 1 FROM users WHERE email = $1', [email]),
            t.none('INSERT INTO pending_users (email, verification_token) VALUES ($1, $2)', [email.toLowerCase(), token])
        ])).then(() => token);
    });
}
exports.addNewPendingUser = addNewPendingUser;
function addCard(sessionId, deckId, front, back) {
    return db.one(`
    INSERT INTO cards (deck_id, front, back)
    SELECT $2, $3, $4 FROM decks
    INNER JOIN sessions ON sessions.user_id = decks.user_id
    WHERE sessions.id = $1
    AND decks.id = $2
    RETURNING cards.id
    `, [sessionId, deckId, front, back]);
}
exports.addCard = addCard;
