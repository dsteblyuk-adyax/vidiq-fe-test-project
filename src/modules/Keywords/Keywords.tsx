import React, { useEffect, useState } from 'react';
import { getAllKeywords, getTrendingKeywords } from '../../services/keywords.service';
import KeywordsScene from '../../scenes/KeywordsScene/KeywordsScene';
// Types
import KeywordData from '../../@types/keyword.type';

const Keywords = () => {
    /* #region  Hooks */
    const [keywords, setKeywords] = useState<KeywordData[]>([]);
    const [keywordsTrending, setKeywordsTrending] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    /* #endregion */

    /* #region  Render Helpers */
    const title = "List of keywords";
    /* #endregion */

    useEffect(() => {
        setIsLoading(true);

        const getKeywords = getAllKeywords().then((response) => {
            setKeywords(response.data)
        });
        const getTrending = getTrendingKeywords().then((response) => {
            setKeywordsTrending(response.data)
        });
        Promise.all([getKeywords, getTrending]).then(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <KeywordsScene
            keywords={keywords}
            title={title}
            isLoading={isLoading}
            keywordsTrending={keywordsTrending}
        />
    );
};

export default Keywords;