import { CUSTOM_VERSIONING_FIELD } from 'src/common';

export const extractor = (request): string | string[] => {
  console.log(request.headers[CUSTOM_VERSIONING_FIELD]);
  return [request.headers[CUSTOM_VERSIONING_FIELD] ?? '']
    .flatMap((v) => v.split(','))
    .filter((v) => !!v)
    .sort()
    .reverse();
};
