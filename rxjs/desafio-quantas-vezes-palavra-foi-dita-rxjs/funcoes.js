import { readdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import nodePath from "node:path";

import { Observable, Subscriber } from "rxjs";
import lodash from "lodash";

/**
 * @param {string} path
 * @returns {Observable<string>}
 */
export function readDir(path) {
  return new Observable((subscriber) => {
    const files = readdirSync(path);
    files.forEach((file) => subscriber.next(nodePath.join(path, file)));
    subscriber.complete();
  });
}

/**
 *
 * @param {(subscriber: Subscriber<any>) => { next: (value: any) => void, error: (error: any) => void, complete: () => void  }} operatorFn
 * @returns {(sourceObs: Observable<any>) => Observable<any>}
 */
function createPipeableOperator(operatorFn) {
  return (sourceObs) =>
    new Observable((subscriber) => {
      const defaultOperatorOptions = {
        next: (value) => {
          subscriber.next(value);
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      };
      const operatorOptions = {
        ...defaultOperatorOptions,
        ...operatorFn(subscriber),
      };
      sourceObs.subscribe(operatorOptions);
    });
}

/**
 * @param {string} ext
 * @returns {(sourceObs: Observable<any>) => Observable<any>}
 */
export function filterByFileExtension(ext) {
  return createPipeableOperator((subscriber) => ({
    next(value) {
      if (typeof value !== "string") {
        return subscriber.error("value is not string!");
      }
      if (value.endsWith(ext)) {
        subscriber.next(value);
      }
    },
  }));
}

/**
 *
 * @returns {(sourceObs: Observable<string>) => Observable<string>}
 */
export function readFiles() {
  return createPipeableOperator((subscriber) => ({
    next(value) {
      const content = readFileSync(value, { encoding: "utf-8" });
      subscriber.next(content);
    },
  }));
}

/**
 *
 * @param {string} by
 * @returns {(sourceObs: Observable<any>) => Observable<any>}
 */
export function separateBy(by) {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      if (Array.isArray(content)) {
        return content.forEach((text) => subscriber.next(text.split(by)));
      }
      subscriber.next(content.split(by));
    },
  }));
}

/**
 * @param {string[]} content
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function removeSymbols(symbols) {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      const contentWithNoSymbols = content.map((text) => {
        return symbols.reduce((acc, symbol) => {
          return acc.replace(symbol, "");
        }, text);
      });
      subscriber.next(contentWithNoSymbols);
    },
  }));
}

/**
 * @param {string[]} content
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function removeTimeline() {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      subscriber.next(content.filter((text) => !text.includes("-->")));
    },
  }));
}

/**
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function removeTag() {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      subscriber.next(content.map((text) => text.replace(/<.+>/g, "")));
    },
  }));
}

/**
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function removeNumbers() {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      subscriber.next(content.map((text) => text.replace(/\d+/, "")));
    },
  }));
}

/**
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function removeEmptyLines() {
  return createPipeableOperator((subscriber) => ({
    next(content) {
      subscriber.next(
        content.map((text) => text.trim()).filter((text) => text)
      );
    },
  }));
}

/**
 * @returns {(sourceObs: Observable<string[]>) => Observable<string[]>}
 */
export function countWords() {
  return createPipeableOperator((subscriber) => ({
    next(words) {
      const result = Object.values(
        words.reduce((acc, word) => {
          const standardWord = word.toLowerCase();
          if (acc[standardWord]) {
            acc[standardWord].count += 1;
            return acc;
          }
          acc[standardWord] = { element: standardWord, count: 1 };
          return acc;
        }, {})
      );
      subscriber.next(result);
    },
  }));
}

/**
 * @param {string} path
 * @returns {(obj: any) => Promise<void>}
 */
export function writeJson(path) {
  return (obj) => writeFile(path, JSON.stringify(obj, null, "\t"));
}

/**
 * @param {{key: string, order: 'asc' | 'desc' | 'rand'}} attr
 * @returns {(sourceObs: Observable<any>) => Observable<any>}
 */
export function orderByAttr(attr) {
  const sortFunctions = {
    asc: (arr) => lodash.sortBy(arr, (el) => el[attr.key]),
    desc: (arr) => lodash.sortBy(arr, (el) => -el[attr.key]),
    rand: (arr) => arr.sort(() => Math.random() * 1),
  };
  return createPipeableOperator((subscriber) => ({
    next(arr) {
      if (attr.order in sortFunctions) {
        return subscriber.next(sortFunctions[attr.order](arr));
      }
      return subscriber.next(sortFunctions.asc());
    },
  }));
}
