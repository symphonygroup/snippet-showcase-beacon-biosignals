import { isBoolean, isNumber, isString } from 'lodash';
import { URLParams } from '../../types/params';

export default function URLParamsConvertor(p: URLParams): URLSearchParams {
  const params = new URLSearchParams();

  if (isNumber(p.page)) {
    params.append('page', String(p.page));
  }

  if (isNumber(p.size)) {
    params.append('size', String(p.size));
  }

  if (isString(p.search)) {
    params.append('search', p.search);
  }

  if (isBoolean(p.includeDeactivated)) {
    params.append('includeDeactivated', String(p.includeDeactivated));
  }

  if (isString(p.email)) {
    params.append('email', p.email);
  }

  if (p.sort) {
    p.sort.forEach((s) => {
      if (s.value) {
        params.append('sort', `${s.name},${s.value.toUpperCase()}`);
      }
    });
  }

  return params;
}
