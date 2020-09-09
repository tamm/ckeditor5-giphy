# ckeditor5-giphy

This is a POC of integration between CK Editor 5 and the Giphy API.

Note: Giphy suggests using their SDK rather than API, and the included key is a rate limited beta key.

This also demonstrates how you can use SweetAlert2 as a plugin modal replacement for CK Editor 5, since it doens't come OOTB. 
As well as selecting something from a result of an AJAX request in the modal.

## Getting set up

Install and import as 
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