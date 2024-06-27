const path = require('path');

module.exports = {
// мы будем довольно часто указывать папку "src" в качестве главной папки для разработки проекта,
// поэтому занесём её в "context", теперь каждый путь будет относителен пути в "context",
// т.е. папки "src"
  context: path.resolve(__dirname, 'src'),
  // путь к точке входа
  entry: './index.js',
  // объект, куда мы передаём имя исходящего файла и путь,
  // куда он будет помещаться (здесь нам нужен именно абсолютный путь),
  // для этого нам нужно прописать path.resolve(__dirname, 'folder')
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // создадим также настройки для расширения Webpack "dev-server"
  devServer: {
    // автоматическая перезагрузка
    hot: true,
    // чтобы Webpack следил за изменением файлов в папке "dist"
    static: {
      directory: './dist',
      watch: true,
    },
  },
};
