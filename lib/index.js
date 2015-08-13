var Transformer = require('babel-core').Transformer;
var t = require('babel-core').types;

function isRenderMethod(member) {
  return member.kind === 'method' && member.key.name === 'render';
}

function isReturnStatement(member) {
  return member.type === 'ReturnStatement';
}

function isClassNameAttribute(attribute) {
  return attribute.name && attribute.name.name === 'className';
}

function createAST() {
  /*
    The AST for:
    (() => {
      if (!this.constructor || !this.constructor.displayName) {
        return '';
      }

      if (!this.constructor.propTypes) {
        return this.constructor.displayName + ' ';
      }

      return this.constructor.displayName + ' ' + Object.keys(this.constructor.propTypes)
        .filter(propKey => propKey.indexOf('is') === 0)
        .map(propKey => this.props[propKey] ? propKey : '')
        .join(' ') + ' ';
      })();
   */
  return JSON.parse(JSON.stringify(require('./qaDecorator.AST.json')));
}

module.exports = new Transformer('react-component-to-class', {
  ClassDeclaration: function (node) {
    const renderMethod = node.body.body.filter(isRenderMethod)[ 0 ];
    if (!renderMethod) {
      return;
    }

    const returnStatement = renderMethod.value.body.body.filter(isReturnStatement)[ 0 ];
    if (!returnStatement) {
      return;
    }

    if (returnStatement.argument.type !== 'JSXElement') {
      return;
    }

    const classNameAttribute = returnStatement.argument.openingElement.attributes.filter(isClassNameAttribute)[ 0 ];

    if (!classNameAttribute) {
      return;
    }

    classNameAttribute.value = t.binaryExpression('+', createAST(), classNameAttribute.value);
  }
});
