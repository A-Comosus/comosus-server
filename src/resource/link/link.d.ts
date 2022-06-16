type UrlMetaResponse = {
  result: {
    status: 'OK' | 'ERROR';
    reason?: string;
    code?: numer;
  };
  meta?: {
    site: {
      name?: string;
      canonical?: string;
      favicon?: string;
      logo?: string;
    };
    description?: string;
    title: string;
    image?: string;
  };
};
