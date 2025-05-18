import { BadParametersException } from 'src/common/base-exception';

export const validateType = <T>(params: unknown, type: T): params is T => {
  if (!params || typeof params !== 'object') {
    throw new BadParametersException({
      message: '입력값이 올바르지 않습니다.',
      debugPayload: { params },
    });
  }

  const typeKeys = Object.keys(type as object);
  const paramKeys = Object.keys(params);

  // 모든 필수 필드가 있는지 확인
  const hasAllRequiredFields = typeKeys.every((key) => paramKeys.includes(key));
  if (!hasAllRequiredFields) {
    const missingFields = typeKeys.filter((key) => !paramKeys.includes(key));
    throw new BadParametersException({
      message: '필수 필드가 누락되었습니다.',
      debugPayload: { missingFields },
    });
  }

  // 타입이 일치하는지 확인
  const typeMatches = typeKeys.every((key) => {
    const typeValue = (type as Record<string, unknown>)[key];
    const paramValue = (params as Record<string, unknown>)[key];
    return typeof typeValue === typeof paramValue;
  });

  if (!typeMatches) {
    throw new BadParametersException({
      message: '필드 타입이 일치하지 않습니다.',
      debugPayload: { params, type },
    });
  }

  return true;
};
