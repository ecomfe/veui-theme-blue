import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import stringify from 'stringify-object';
import icons from '../assets/icons.json';

const MODULE_TPL = fs.readFileSync(
    path.resolve(__dirname, './icon.tpl'),
    'utf8'
);
const ICON_PATH = path.resolve(__dirname, '../icons');
rimraf.sync(ICON_PATH);

let indexModule = '';
let names = Object.keys(icons);
names.forEach(function (name) {
    console.log(name, 'name_before');
    let name_value = name.split('.').length > 1 ? name.split('.')[1] : name;
    console.log(name, 'name_after');
    let icon = {};
    icon[name_value] = icons[name];
    let filePath = path.join(ICON_PATH, `${name_value}.js`);
    let dirname = path.dirname(filePath);

    if (!fs.existsSync(dirname)) {
        mkdirp.sync(dirname);
    }
    fs.writeFileSync(
        filePath,
        MODULE_TPL.replace('${icon}', stringify(icon).replace(/\t/g, '  '))
    );
    indexModule += `import './${name_value}'\n`;
});

fs.writeFileSync(path.join(ICON_PATH, 'index.js'), indexModule);
console.log(names.length + ' icon modules generated.');

fs.writeFileSync(path.join(ICON_PATH, 'icon-names.json'), JSON.stringify(names, null, '  '));
