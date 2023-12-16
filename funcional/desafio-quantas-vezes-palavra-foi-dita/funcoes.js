import { readdir, readFile, writeFile } from 'node:fs/promises'
import nodePath from 'node:path';

/**
 * 
 * @param  {Function[]} fns functions to compose
 * @returns {any}
 */
export function compose(...fns) {
  return (value) => {
    return fns.reduce(async (acc, fn) => {
      if (Promise.resolve(acc) === acc) return fn(await acc);
      return fn(acc);
    }, value)
  }
}

/** 
 * @param {string} path 
 */
export async function readDir(path) {
  let files = await readdir(path);
  return files.map(file => nodePath.join(path, file))
}

/**
 * @param {string[]} paths 
 */
export function filterBySrt(paths) {
  return paths.filter(path => path.endsWith('.srt'));
}

/**
 * @param {string[]} paths 
 */
export function readFiles(paths) {
  return Promise.all(paths.map(path => readFile(path, { encoding: 'utf-8' })))
}

/**
 * @param {string[]} content 
 */
export function joinContent(content) {
  return content.join('')
}

/**
 * @param {string} content 
 */
export function separateByLine(content) {
  return content.split('\n');
}

/**
 * @param {string} content 
 */
export function separateByWord(content) {
  return content.split(' ');
}

/**
 * @param {string[]} content 
 */
export function removeSymbols(content) {
  const symbols = [
    '.', '?', '!', '-', ',', '"', '♪', '\r', '(', ')', '[', ']'
  ]
  return content.map((text) => {
    return symbols.reduce((acc, symbol) => {
      return acc.replace(symbol, '');
    }, text)
  })
}

/**
 * @param {string[]} content 
 */
export function removeTimeline(content) {
  return content.filter((text) => !text.includes('-->'))
}

/**
 * @param {string[]} content 
 */
export function removeTag(content) {
  return content.map((text) => text.replace(/<.+>/g, ''))
}

/**
 * @param {string[]} content 
 */
export function removeNumbers(content) {
  return content.filter((text) => !(/\d+/.test(text.trim())))
}

/**
 * @param {string[]} content 
 */
export function removeEmptyLines(content) {
  return content.filter((text) => text.trim())
}

/**
 * 
 * @param {string[]} words 
 */
export function countWords(words) {
  return Object.values(words.reduce((acc, word) => {
    const standardWord = word.toLowerCase();
    if (acc[standardWord]) {
      acc[standardWord].count += 1;
      return acc;
    }
    acc[standardWord] = { element: standardWord, count: 1 };
    return acc;
  }, {}))
}

/**
 * 
 * @param {string} path 
 * @returns {(obj: any) => Promise<void>}
 */
export function writeJson(path) {
  return (obj) => writeFile(path, JSON.stringify(obj, null, '\t'));
}

/**
 * @param {string} key 
 * @param {string} order 
 * @returns {(arr: any[]) => any[]}
 */
export function orderByAttr(key, order) {
  const sortFunctions = {
    asc: (a, b) => a[key] - b[key],
    desc: (a, b) => b[key] - a[key],
    rand: () => Math.random() * 1
  }
  return (arr) => {
    if (order in sortFunctions) {
      return arr.sort(sortFunctions[order])
    }
    return arr.sort(sortFunctions.asc)
  }
}