#!/bin/bash

# copies accross all built html files from the "build" directory over to the "hosting" directory, then pushes changes to github pages

echo "Beginning build process, please wait a moment during initialisation"

codedoc build

echo "Building complete"



echo "commencing copying to \"hosting\" repository"
touch ../blog/guard
rm -r ../blog/*
cp -r ./dist/* ../blog/

#echo "publishing changes to github pages"
#cd ../blog
#git add -A
#git commit -m "Automated commit"
#git push -u origin main
#cd ../coding-blog-boilerplate
