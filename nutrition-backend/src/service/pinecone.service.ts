import { Pinecone } from '@pinecone-database/pinecone';
import config from '../../config/config';

// index "nutrition-index-1"
const pc = new Pinecone({
	apiKey: config.pineConeApiKey as string,
});
const index = pc.Index('nutrition-index-1');

export const queryVectors = async (queryVector: number[]) => {
	const queryResponse = await index.namespace('iter5').query({
		topK: 5,
		vector: queryVector,
		includeValues: false,
		includeMetadata: true,
	});

	return queryResponse;
};

