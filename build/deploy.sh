npm run build
echo '  \033[32m npm run build. \033[0m \n'

sed -i "" 's/static\/img/\..\/..\/static\/img/g' `grep static/img -rl components`
