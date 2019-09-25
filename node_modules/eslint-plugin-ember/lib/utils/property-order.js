'use strict';

const ember = require('./ember');
const utils = require('./utils');

module.exports = {
  determinePropertyType,
  reportUnorderedProperties,
  addBackwardsPosition,
};

const NAMES = {
  actions: 'actions hash',
  activate: 'lifecycle hook',
  afterModel: 'lifecycle hook',
  attribute: 'attribute',
  beforeModel: 'lifecycle hook',
  controller: 'controller injection',
  deactivate: 'lifecycle hook',
  didDestroyElement: 'lifecycle hook',
  didInsertElement: 'lifecycle hook',
  didReceiveAttrs: 'lifecycle hook',
  didRender: 'lifecycle hook',
  didUpdate: 'lifecycle hook',
  didUpdateAttrs: 'lifecycle hook',
  'empty-method': 'empty method',
  init: 'lifecycle hook',
  'lifecycle-hook': 'lifecycle hook',
  method: 'method',
  model: '"model" hook',
  observer: 'observer',
  property: 'property',
  'single-line-function': 'single-line function',
  'multi-line-function': 'multi-line function',
  'query-params': 'property',
  redirect: 'lifecycle hook',
  relationship: 'relationship',
  renderTemplate: 'lifecycle hook',
  resetController: 'lifecycle hook',
  serialize: 'lifecycle hook',
  service: 'service injection',
  setupController: 'lifecycle hook',
  unknown: 'unknown property type',
  willClearRender: 'lifecycle hook',
  willDestroyElement: 'lifecycle hook',
  willInsertElement: 'lifecycle hook',
  willRender: 'lifecycle hook',
  willUpdate: 'lifecycle hook',
};

function determinePropertyType(node, parentType) {
  if (ember.isInjectedServiceProp(node.value)) {
    return 'service';
  }

  if (ember.isInjectedControllerProp(node.value)) {
    return 'controller';
  }

  if (node.key.name === 'init') {
    return 'init';
  }

  if (parentType === 'component') {
    if (ember.isComponentLifecycleHook(node)) {
      return node.key.name;
    }
  }

  if (parentType === 'controller') {
    if (node.key.name === 'queryParams') {
      return 'query-params';
    } else if (ember.isControllerDefaultProp(node)) {
      return 'inherited-property';
    }
  }

  if (parentType === 'model') {
    if (ember.isModule(node.value, 'attr', 'DS')) {
      return 'attribute';
    } else if (ember.isRelation(node)) {
      return 'relationship';
    }
  }

  if (parentType === 'route') {
    if (ember.isRouteDefaultProp(node)) {
      return 'inherited-property';
    } else if (ember.isRouteLifecycleHook(node)) {
      return node.key.name;
    }
  }

  if (ember.isObserverProp(node.value)) {
    return 'observer';
  }

  if (parentType !== 'model' && ember.isActionsProp(node)) {
    return 'actions';
  }

  if (ember.isSingleLineFn(node)) {
    return 'single-line-function';
  }

  if (ember.isMultiLineFn(node)) {
    return 'multi-line-function';
  }

  if (ember.isCustomProp(node)) {
    return 'property';
  }

  if (ember.isFunctionExpression(node.value)) {
    if (utils.isEmptyMethod(node)) {
      return 'empty-method';
    }

    return 'method';
  }

  return 'unknown';
}

function getOrder(ORDER, type) {
  for (let i = 0, len = ORDER.length; i < len; i++) {
    const value = ORDER[i];
    if (typeof value === 'string') {
      if (value === type) {
        return i;
      }
    } else {
      const index = value.indexOf(type);
      if (index !== -1) {
        return i;
      }
    }
  }

  return ORDER.length;
}

function getName(type, node) {
  let prefix;
  if (!node.computed && type !== 'actions' && type !== 'model') {
    if (node.key.type === 'Identifier') {
      prefix = node.key.name;
    } else if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
      prefix = node.key.value;
    }
  }

  const typeDescription = NAMES[type];

  if (type === 'inherited-property') {
    return prefix ? `inherited "${prefix}" property` : 'inherited property';
  }

  return prefix ? `"${prefix}" ${typeDescription}` : typeDescription;
}

function reportUnorderedProperties(node, context, parentType, ORDER) {
  let maxOrder = -1;
  const firstPropertyOfType = {};
  let firstPropertyOfNextType;

  ember.getModuleProperties(node).forEach(property => {
    const type = determinePropertyType(property, parentType);
    const order = getOrder(ORDER, type);

    const info = {
      node: property,
      type,
    };

    // check if this property should be moved further upwards
    if (order < maxOrder) {
      // look for correct position to insert this property
      for (let i = order + 1; i <= maxOrder; i++) {
        firstPropertyOfNextType = firstPropertyOfType[i];
        if (firstPropertyOfNextType) {
          break;
        }
      }

      const typeName = getName(info.type, info.node);
      const nextTypeName = getName(firstPropertyOfNextType.type, firstPropertyOfNextType.node);
      const nextSourceLine = firstPropertyOfNextType.node.loc.start.line;

      context.report({
        node: property,
        message: `The ${typeName} should be above the ${nextTypeName} on line ${nextSourceLine}`,
        fix: fixer => {
          // for capturing the moved property and EOL character to insert ',' in between
          const propertyWithEOL = /(.+)(\s+)$/;
          const sourceCode = context.getSourceCode();
          const foundProperty = firstPropertyOfNextType.node;
          let nextToken = property;
          let optionalComma = '';
          let isLastProperty = false;

          // including EOL character(s)
          do {
            const previousToken = nextToken;
            nextToken = sourceCode.getTokenAfter(nextToken, {
              includeComments: true,
            });

            if (!nextToken) {
              nextToken = previousToken;
            }

            // adding a trailing comma when it's the last property defined
            if (nextToken.value === '}') {
              isLastProperty = true;

              if (previousToken.value !== ',') {
                optionalComma = ',';
              }
            }
          } while (nextToken.value === ',');

          // additional whitespace is needed only when it's the last property
          const whitespaceCount = isLastProperty ? property.loc.start.column : 0;

          const propertyOffset = getCommentOffsetBefore(property, sourceCode);
          const foundPropertyOffset = getCommentOffsetBefore(foundProperty, sourceCode);

          const offset = nextToken.start - property.end;
          const textBetween = property.start - propertyOffset - foundProperty.end - whitespaceCount;

          const replaceTextRange = [foundProperty.start - foundPropertyOffset, nextToken.start];
          const movedProperty = sourceCode.getText(property, propertyOffset, offset);
          const restText = sourceCode.getText(foundProperty, foundPropertyOffset, textBetween);

          // adding the optional comma between the property and newline
          const replaceWithComma = `$1${optionalComma}$2`;
          const movedPropertyWithComma = movedProperty.replace(propertyWithEOL, replaceWithComma);
          const optionalWhitespace = new Array(whitespaceCount + 1).join(' ');

          const outputText = movedPropertyWithComma + optionalWhitespace + restText;

          return fixer.replaceTextRange(replaceTextRange, outputText);
        },
      });
    } else {
      maxOrder = order;

      if (!(order in firstPropertyOfType)) {
        firstPropertyOfType[order] = info;
      }
    }
  });
}

function getCommentOffsetBefore(property, sourceCode) {
  const commentBlockRegExp = /^\/\*(.|\s)*\*\/$/m;
  const commentLineRegExp = /^\/\/.*$/;
  const previousToken = sourceCode.getTokenBefore(property, {
    includeComments: true,
  });
  const previousTokenText = sourceCode.getText(previousToken);

  // including comments above the moved property
  const isLineComment = previousToken.type === 'Line' && commentLineRegExp.test(previousTokenText);
  const isBlockComment =
    previousToken.type === 'Block' && commentBlockRegExp.test(previousTokenText);

  if (isLineComment || isBlockComment) {
    return property.start - previousToken.start;
  }

  return 0;
}

function addBackwardsPosition(order, newPosition, targetPosition) {
  const positionOrder = order.slice();

  const containsPosition = positionOrder.some(position => {
    if (Array.isArray(position)) {
      return position.indexOf(newPosition) > -1;
    }

    return position === newPosition;
  });

  if (!containsPosition) {
    const targetIndex = positionOrder.indexOf(targetPosition);
    if (targetIndex > -1) {
      positionOrder[targetIndex] = [targetPosition, newPosition];
    } else {
      positionOrder.forEach(position => {
        if (Array.isArray(position) && position.indexOf(targetPosition) > -1) {
          position.push(newPosition);
        }
      });
    }
  }

  return positionOrder;
}
