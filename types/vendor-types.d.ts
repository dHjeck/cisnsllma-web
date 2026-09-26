/**
 * 指向包内类型声明文件的引用
 *
 * 说明：element-plus@2.3.6、@pureadmin/table、@pureadmin/descriptions 的
 * package.json `exports` 未暴露 ./global、./volar 子路径，在
 * moduleResolution: "Bundler" 下无法通过 tsconfig `types` 解析，
 * 故以 reference path 直接引用（文件均存在于包根目录）。
 */
/// <reference path="../node_modules/element-plus/global.d.ts" />
/// <reference path="../node_modules/@pureadmin/table/volar.d.ts" />
/// <reference path="../node_modules/@pureadmin/descriptions/volar.d.ts" />
