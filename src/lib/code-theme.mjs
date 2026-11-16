// 代码高亮只用三种颜色：关键字黛蓝、数字赭红、注释灰，其余都是墨色。
export default {
  name: 'weijiang',
  type: 'light',
  colors: {
    'editor.background': '#F2F4F7',
    'editor.foreground': '#24282E',
  },
  tokenColors: [
    { settings: { foreground: '#24282E' } },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#5B6370' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#34506E' },
    },
    {
      scope: ['keyword.operator', 'storage.type.function.arrow'],
      settings: { foreground: '#24282E' },
    },
    {
      scope: ['constant.numeric'],
      settings: { foreground: '#8C4A3A' },
    },
  ],
};
