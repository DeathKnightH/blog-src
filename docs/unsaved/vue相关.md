## 1.webstorm 识别 vue-cli 中的别名设置
```
import * as utils from "@/utils/StringUtil.js"
```
上例中的 `@` 就是常见的 webpack 路径别名，通常主流 IDE 例如 WebStorm 是可以识别的。

但是 Vue CLI 3 里，是没有传统的 webpack 配置文件的，因为使用另一种写法集成到了 vue.config.js 里，这时 WebStorm 就无法识别别名了，在编辑器里表现为 CTRL + 左键点击无法跳转到响应文件。

解决方案：

在本地代码仓库项目的根目录里新建一个 conf.js 文件：
```
/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
};
```
在 `settings`->`Language & Framework`->`JavaScript`->`Webpack` 将 webpack 配置文件设置为上面新建的 conf.js。
