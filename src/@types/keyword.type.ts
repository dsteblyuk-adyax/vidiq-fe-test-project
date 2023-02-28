export default interface KeywordData {
    id: number,
    keyword: string,
    search_volume: number,
    competition: string,
    overall_score: number,
    [index: string]: string | number;
};
