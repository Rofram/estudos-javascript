import { 
  readDir, 
  filterBySrt, 
  readFiles, 
  joinContent,
  separateByLine,
  separateByWord,
  removeTimeline, 
  removeSymbols,
  removeTag, 
  removeNumbers,
  removeEmptyLines,
  countWords,
  writeJson
} from './funcoes.js';
import path from 'node:path';

const subtitlePath = path.join(process.cwd(), 'legendas');
const wordsFile = path.join(process.cwd(), 'words.json');

readDir(subtitlePath)
  .then(filterBySrt)
  .then(readFiles)
  .then(joinContent)
  .then(separateByLine)
  .then(removeTimeline)
  .then(removeTag)
  .then(removeSymbols)
  .then(removeNumbers)
  .then(removeEmptyLines)
  .then(joinContent)
  .then(separateByWord)
  .then(removeEmptyLines)
  .then(removeSymbols)
  .then(countWords)
  .then(writeJson(wordsFile))
  
