export interface PostSearchBody {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator: string;
}

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
