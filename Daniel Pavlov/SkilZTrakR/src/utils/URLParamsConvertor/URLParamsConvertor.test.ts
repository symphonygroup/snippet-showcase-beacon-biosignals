import { URLParams } from '../../types/params';
import URLParamsConvertor from './URLParamsConvertor';

describe('URLParamsConvertor', () => {
  test('Should be able to generate search params for page and size', () => {
    const params: URLParams = {
      page: 0,
      size: 10,
      sort: [],
      search: '',
    };

    const searchParams = URLParamsConvertor(params);

    expect(searchParams.get('page')).toBe('0');
    expect(searchParams.get('size')).toBe('10');
    expect(searchParams.get('sort')).toBeNull();
    expect(searchParams.get('search')).toBe('');
  });

  test('Should be able add param for search if existent in params', () => {
    const params: URLParams = {
      page: 0,
      size: 10,
      sort: [{ name: 'sort', value: 'asc' }],
      search: 'search this',
    };

    const searchParams = URLParamsConvertor(params);

    expect(searchParams.get('search')).toBe('search this');
  });

  test('Should be able add param for sort if existent in params and has a value', () => {
    const params: URLParams = {
      page: 0,
      size: 10,
      sort: [{ name: 'sort', value: 'asc' }, { name: 'sort2' }],
      search: '',
    };

    const searchParams = URLParamsConvertor(params);

    expect(searchParams.get('sort')).toBe('sort,ASC');
  });
});
