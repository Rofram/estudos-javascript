import { 
  readDir, 
  filterByFileExtension,
  readFiles, 
  separateBy,
  removeTimeline, 
  removeSymbols,
  removeTag, 
  removeNumbers,
  removeEmptyLines,
  countWords,
  orderByAttr,
  writeJson
} from './funcoes.js';
import path from 'node:path';

import { concatAll, groupBy, map, mergeMap, reduce, toArray } from 'rxjs/operators';

const subtitlePath = path.join(process.cwd(), 'desafio-quantas-vezes-palavra-foi-dita-rxjs', 'legendas');
const wordsFile = path.join(process.cwd(), 'desafio-quantas-vezes-palavra-foi-dita-rxjs', 'words.json');
const symbols = [
  ".",
  "?",
  "!",
  "-",
  ",",
  '"',
  "♪",
  "\r",
  "(",
  ")",
  "[",
  "]",
  ":"
];

readDir(subtitlePath)
  .pipe(
    filterByFileExtension('.srt'),
    readFiles(),
    separateBy("\n"),
    removeTimeline(),
    removeTag(),
    removeSymbols(symbols),
    removeNumbers(),
    removeEmptyLines(),
    separateBy(" "),
    removeSymbols(symbols),
    removeEmptyLines(),
    concatAll(),
    // toArray(),
    groupBy(el => el),
    mergeMap(group => group.pipe(toArray())),
    map(words => ({ element: words[0], count: words.length })),
    toArray(),
    // countWords(),
    orderByAttr({ key: 'count', order: 'desc' })
  )
  .subscribe(console.log);
