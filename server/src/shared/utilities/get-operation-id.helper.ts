export function GetOperationId(model: string, operation: string) {
  const modelOperate = ToTitleCase(model).replace(/\s/g, '');
  const operationOperate = ToTitleCase(operation).replace(/\s/g, '');

  return {
    title: '',
    operationId: `${modelOperate}_${operationOperate}`,
  };
}

function ToTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}
