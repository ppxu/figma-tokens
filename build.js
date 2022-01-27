const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'shadow/customShadow',
  type: 'value',
  matcher: function (token) {
    return token.type === 'boxShadow';
  },
  transformer: (token) => {
    if (token.name.includes('border')) {
      const border = token.value;
      return `1px solid ${border.color}`;
    }

    const shadows = Object.values(token.value);
    const result = shadows.map(
      (shadow) =>
        `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`
    );
    return result.join(',');
  },
});

StyleDictionary.registerTransform({
  name: 'font/customFont',
  type: 'value',
  matcher: function (token) {
    return token.type === 'typography';
  },
  transformer: (token) => {
    const font = token.value;
    return `${
      font.fontWeight === 'Regular'
        ? 400
        : font.fontWeight === 'Medium'
        ? 500
        : 400
    } ${font.fontSize}px/${font.lineHeight}px ${font.fontFamily}`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css',
    'shadow/customShadow',
    'font/customFont',
  ],
});

const StyleDictionaryExtend = StyleDictionary.extend({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: 'css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

StyleDictionaryExtend.buildAllPlatforms();
