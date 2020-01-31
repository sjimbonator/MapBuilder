# MapBuilder

To run the project first open the "Identity" folder/project in visual studio.
Run the project with IIS Express and copy the url.
Then open "InteractiveMapBuilder" folder with visual studio code.
Open terminal "ctrl+shift+`" or Terminal > new terminal.
Run npm install command to install all dependencies/ 
Open the globals.ts file in ../MapBuilder/InteractiveMapBuilder/src/app/globals.ts and change the url variable to the one you copied earlier.
Open the coordinate.component.js file in ../MapBuilder/InteractiveMapBuilder/node_modules/ngx-openlayers/dist/components/coordinate.component.js
And change the line of code on line 29 from: referenceProjectionCode = referenceProjection ? referenceProjection.getCode() : 'EPSG:3857';
to referenceProjectionCode = referenceProjection ? 'EPSG:3857' : 'EPSG:3857';
And finally run ng serve --open in the terminal to run the app.
