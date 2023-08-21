const algoliasearch = require('algoliasearch');
const fs = require('fs');

// 从环境变量或 Secrets 中读取 Algolia 密钥
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID  ;
const ALGOLIA_API_KEY = process.env.ALGOLIA_SEARCH_KEY  ;
const ALGOLIA_INDEX_NAME = "riko-tu.github.io";

// 读取 index.json 文件
const indexFilePath = 'docs/index.json';
const jsonData = fs.readFileSync(indexFilePath, 'utf8');
const objects = JSON.parse(jsonData);

console.log(ALGOLIA_APP_ID,ALGOLIA_API_KEY)
// Algolia 客户端
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// 覆盖 Algolia 索引
async function overwriteAlgoliaIndex() {
    try {
        // 清空现有索引
        await index.clearObjects();

        // 添加新的对象到索引
        await index.saveObjects(objects);

        console.log('Index overwritten successfully.');
    } catch (error) {
        console.error('Error overwriting index:', error);
    }
}

overwriteAlgoliaIndex();