import * as fetch from 'isomorphic-fetch';

function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
};

let id = 0;
const decks: any[] = [
];

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export async function post(url: string, body: any): Promise<any> {
  await delay(1000);
  switch (url) {
    case '/api/signin':
      return {ok: true}
    case '/api/decks':
      if (!body.name) {
        return {ok: false};
      }
      id++;
      decks.push({id, name: body.name});
      return {
        ok: true,
        json: () => clone(decks[decks.length - 1])
      }
    default:
      return {ok: false}
  }
}

export async function get(url: string): Promise<any> {
  await delay(1000);
  switch (url) {
    case '/api/decks': return {
      ok: true,
      json: () => ({
        decks: clone(decks)
      })
    }
    default: return { ok: false }
  }
}