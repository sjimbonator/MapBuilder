# MapBuilder
# Instructions to run webapp:
1. Open the "Identity" folder/project in visual studio.
2. Run the project with IIS Express and copy the url.
3. Then open "InteractiveMapBuilder" folder with visual studio code.
4. Open terminal "ctrl+shift+`" or Terminal > new terminal.
5. Run npm install command to install all dependencies/ 
6. Open the globals.ts file in ../MapBuilder/InteractiveMapBuilder/src/app/globals.ts and change the url variable to the one you copied 1. earlier.
7. Open the coordinate.component.js file in ../MapBuilder/InteractiveMapBuilder/node_modules/ngx-openlayers/dist/components/coordinate.component.js
8. And change the line of code on line 29 from: referenceProjectionCode = referenceProjection ? referenceProjection.getCode() : 'EPSG:3857';
9. to referenceProjectionCode = referenceProjection ? 'EPSG:3857' : 'EPSG:3857';
10. And finally run ng serve --open in the terminal to run the app.

# Description
![Screenshot of the mapviewer](https://github.com/sjimbonator/MapBuilder/blob/master/screenshots/Screenshot1.PNG)
![Screenshot of the mapviewer](https://github.com/sjimbonator/MapBuilder/blob/master/screenshots/screenshot2.PNG)
An interactive map builder made with angular and asp.net. Specifically designed for game maps.

