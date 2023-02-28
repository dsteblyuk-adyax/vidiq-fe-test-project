import http from './index';
import KeywordData from '../@types/keyword.type';

export const getAllKeywords = () => {
    return http.get<Array<KeywordData>>("/keywords");
};

export const getTrendingKeywords = () => {
    return http.get<Array<number>>("/trending-keywords");
};
