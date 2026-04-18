// src/utils/jsonParser.ts

export type JsonType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export interface TypeAst {
  type: JsonType;
  children?: Record<string, TypeAst>;
  items?: TypeAst; // For arrays
}

export function parseJsonToAst(jsonObj: any): TypeAst {
  if (jsonObj === null) {
    return { type: 'null' };
  }
  if (Array.isArray(jsonObj)) {
    // Merge array items types to a single representative type
    const itemTypes = jsonObj.map(parseJsonToAst);
    let mergedItemType: TypeAst = { type: 'null' }; // default
    if (itemTypes.length > 0) {
      // Simplification: just take the first item's structure
      // For a robust implementation, we should merge all objects in the array
      mergedItemType = itemTypes[0];
    }
    return { type: 'array', items: mergedItemType };
  }
  if (typeof jsonObj === 'object') {
    const children: Record<string, TypeAst> = {};
    for (const [key, value] of Object.entries(jsonObj)) {
      children[key] = parseJsonToAst(value);
    }
    return { type: 'object', children };
  }
  
  if (typeof jsonObj === 'string') return { type: 'string' };
  if (typeof jsonObj === 'number') return { type: 'number' };
  if (typeof jsonObj === 'boolean') return { type: 'boolean' };
  
  return { type: 'string' }; // fallback
}

export function generateTypeScript(ast: TypeAst, rootName = 'Root'): string {
  let output = '';

  function traverse(node: TypeAst, name: string, indent: string): string {
    if (node.type === 'string') return 'string';
    if (node.type === 'number') return 'number';
    if (node.type === 'boolean') return 'boolean';
    if (node.type === 'null') return 'any';
    if (node.type === 'array') {
      const itemType = node.items ? traverse(node.items, name + 'Item', indent) : 'any';
      return `${itemType}[]`;
    }
    if (node.type === 'object' && node.children) {
      let objStr = '{\n';
      const newIndent = indent + '  ';
      for (const [key, childNode] of Object.entries(node.children)) {
        const childType = traverse(childNode, key, newIndent);
        objStr += `${newIndent}${key}: ${childType};\n`;
      }
      objStr += `${indent}}`;
      return objStr;
    }
    return 'any';
  }

  const rootBody = traverse(ast, rootName, '');
  output += `export interface ${rootName} ${rootBody}\n`;
  return output;
}

export function generateGo(ast: TypeAst, rootName = 'Root'): string {
  let output = '';
  const structs: string[] = [];

  function toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function traverse(node: TypeAst, name: string): string {
    const structName = toPascalCase(name);
    
    if (node.type === 'string') return 'string';
    if (node.type === 'number') return 'float64';
    if (node.type === 'boolean') return 'bool';
    if (node.type === 'null') return 'interface{}';
    if (node.type === 'array') {
      const itemType = node.items ? traverse(node.items, name + 'Item') : 'interface{}';
      return `[]${itemType}`;
    }
    if (node.type === 'object' && node.children) {
      let structStr = `type ${structName} struct {\n`;
      for (const [key, childNode] of Object.entries(node.children)) {
        const fieldType = traverse(childNode, key);
        const fieldName = toPascalCase(key);
        structStr += `\t${fieldName} ${fieldType} \`json:"${key}"\`\n`;
      }
      structStr += `}\n`;
      if (name !== 'Root') {
         structs.push(structStr);
      } else {
         output = structStr + '\n' + output; // Root at top
      }
      return structName;
    }
    return 'interface{}';
  }

  traverse(ast, rootName);
  return output + structs.reverse().join('\n');
}

export function generatePython(ast: TypeAst, rootName = 'Root'): string {
  let output = 'from pydantic import BaseModel\nfrom typing import List, Any, Optional\n\n';
  const classes: string[] = [];

  function toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function traverse(node: TypeAst, name: string): string {
    const className = toPascalCase(name);
    
    if (node.type === 'string') return 'str';
    if (node.type === 'number') return 'float';
    if (node.type === 'boolean') return 'bool';
    if (node.type === 'null') return 'Any';
    if (node.type === 'array') {
      const itemType = node.items ? traverse(node.items, name + 'Item') : 'Any';
      return `List[${itemType}]`;
    }
    if (node.type === 'object' && node.children) {
      let classStr = `class ${className}(BaseModel):\n`;
      let hasFields = false;
      for (const [key, childNode] of Object.entries(node.children)) {
        hasFields = true;
        const fieldType = traverse(childNode, key);
        classStr += `    ${key}: Optional[${fieldType}] = None\n`;
      }
      if (!hasFields) {
        classStr += `    pass\n`;
      }
      classes.push(classStr);
      return className;
    }
    return 'Any';
  }

  traverse(ast, rootName);
  return output + classes.reverse().join('\n');
}
