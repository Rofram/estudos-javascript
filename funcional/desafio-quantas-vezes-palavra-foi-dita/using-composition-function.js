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
  writeJson,
  compose,
  orderByAttr
} from './funcoes.js';
import path from 'node:path';

const subtitlePath = path.join(process.cwd(), 'legendas');
const wordsFile = path.join(process.cwd(), 'words.json');

const getFileContent = compose(
  readDir,
  filterBySrt,
  readFiles,
)

const sanitizeText = compose(
  joinContent,
  separateByLine,
  removeTimeline,
  removeTag,
  removeSymbols,
  removeNumbers,
  removeEmptyLines,
  joinContent,
)

const splitWords = compose(
  separateByWord,
  removeEmptyLines,
  removeSymbols,
)

const countWordSubtitlesByDirectory = compose(
  getFileContent,
  sanitizeText,
  splitWords,
  countWords,
  orderByAttr('count', 'desc'),
  writeJson(wordsFile)
)

countWordSubtitlesByDirectory(subtitlePath)
