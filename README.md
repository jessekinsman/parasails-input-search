#h1 Parasails input search component
This is a Vue.js component that can be used with the [sails.js](https://sailsjs.com/get-started) and [parasails.js](https://github.com/mikermcneil/parasails).
Parasails is essentially a port of Vue.js that is slightly customized to work better within sails.js
Place in your assets/js/components/ directory
You should be able to use directly in your EJS templates from there.

#h3 What is the input search
Essentially it is very similar to a select, except as the user inputs text it only displays items that contain that text, whereas a select control only displays items that start with the text entered
This is built off of bootstrap so should display well if you are using bootstrap with sails.js
It does not include any styling

![input search screenshot](https://www.dropbox.com/s/8mh13t3yxl44246/input-search.png?dl=0)

#h3 Props
**bold text** Here are the props need for this to function correctly
- list: this the list you want the user to select and item from. Must be an array of objects that have an id and name property
- placeholder: pass a text string that you want to be the placeholder in the input
- id: pass an text string that you want to be used as the id for the input element. This is required as it is also used to compute if there is sufficient space below the input to display the menu
- iconClass: pass a text string for the class you want used for the close icon
- current: pass an id of the current element that is selected
- error: pass a boolean if there is an error and you want the input highlighed using the is-invalid bootstrap class
- checktop: pass a boolean 
-- True: you want to calculate the distance from the bottom of the window and display above the input if not enough space
-- False: you always want the menu displayed below the input element. It will not calculate

#h3 Future improvements
When you key down or key up through the menu, it currently does not automatically scroll. Would like to add that feature.
