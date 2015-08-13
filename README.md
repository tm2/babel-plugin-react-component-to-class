# babel-plugin-react-display-name

Add displayName to React.createClass calls

## Installation

```sh
$ npm install babel-plugin-react-component-to-class
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-react-component-to-class"]
}
```

### Via CLI

```sh
$ babel --plugins babel-plugin-react-component-to-class script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-react-component-to-class"]
});
```
