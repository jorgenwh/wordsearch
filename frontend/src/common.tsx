import { WordSearchConfig } from './games/wordsearch/wordsearch';
import { WeaveConfig } from './games/weave/weave';

export const FRONTEND_PORT = 3000;
export const BACKEND_PORT = 8000;


export interface DailyConfig {
    wordSearchConfig: WordSearchConfig;
    weaveConfig: WeaveConfig;
}
