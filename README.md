# ckeditor5-giphy

This is a POC of integration between CK Editor 5 and the Giphy API.

Note: Giphy suggests using their SDK rather than API, and the included key is a rate limited beta key.

This also demonstrates how you can use SweetAlert2 as a plugin modal replacement for CK Editor 5, since it doens't come OOTB. 
As well as selecting something from a result of an AJAX request in the modal.

This is based on the tutorial [Creating a simple plugin](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/creating-simple-plugin.html).

![Screenshot of toolbar icon](/screenshots/toolbar-icon.png?raw=true "Screenshot of toolbar icon")
![Screenshot of search input dialog](/screenshots/search-input.png?raw=true "Screenshot of search input dialog")
![Screenshot of of search result dialog](/screenshots/search-result.png?raw=true "Screenshot of of search result dialog")

## Prerequisites

You need to [use CK Editor 5 from source](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html#scenario-2-building-from-source).

Don't forget to [make sure your webpack config works](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#using-create-react-app1)
, it might need some tweaking for example if you use Create React App.

To load the SVG Icon I have used `svg-inline-loader`, but you can use other webpack methods.
```
npm install --save-dev svg-inline-loader
```
Add this in your `module -> rules -> oneOf`, BEFORE `file-loader`.
```
{
    test: /\.svg$/,
    loader: 'svg-inline-loader',
},
```

## Getting set up

Install 
```
npm install https://github.com/tamm/ckeditor5-giphy.git -S
```
and import as 
```
import 'ckeditor5-giphy';
```

Then add to CK Editor 5 config as

```
config={ {
    plugins: [ Giphy, Image ],
    toolbar: [ 'giphy']
} }
```

Visit https://developers.giphy.com/docs/api#quick-start-guide
to get an API key.

Then add your key to the global variable for config.
You can also change a couple of other settings:

```
const giphyOptions = {
  apiBase: 'https://api.giphy.com/v1',
  apiKey: 'YOUR-KEY-HERE', // https://developers.giphy.com/docs/api#quick-start-guide
}
```

## License

As CK Editor 5 is GPL, this is GPL. 
Please consider this if you reuse the code in any way.