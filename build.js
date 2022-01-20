const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'shadow/customShadow',
  type: 'value',
  matcher: function (token) {
    return token.type === 'boxShadow';
  },
  transformer: (token) => {
    const shadows = Object.values(token.value);
    const result = shadows.map(
      (shadow) =>
        `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`
    );
    return result.join(',');
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
