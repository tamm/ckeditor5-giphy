/*global giphyOptions*/

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Swal from 'sweetalert2';
import './ckeditor-giphy.css';

import imageIcon from './giphy.svg';

const giphyOptionsDefault = {
  apiBase: 'https://api.giphy.com/v1',
  apiKey: 'no-api-key', // https://developers.giphy.com/docs/api#quick-start-guide
}
  
export default class Giphy extends Plugin {
  init() {
    const editor = this.editor;
    /* es-lint-disable no-undef */
    const giphyOptionsCombined = typeof giphyOptions !== 'undefined' ? {...giphyOptionsDefault, ...giphyOptions} : {...giphyOptionsDefault};

    editor.ui.componentFactory.add( 'giphy', locale => {
      const view = new ButtonView( locale );

      view.set( {
        label: 'GIPHY',
        icon: imageIcon,
        tooltip: true
      } );

      // Callback executed once the image is clicked.
      view.on( 'execute', () => {
        Swal.fire({
          customClass: {
            container: 'ckeditor-giphy-modal',
          },
          title: 'Search for a gif on GIPHY',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          inputValidator: (value) => {
            if (value.length < giphyOptionsCombined.minimumCharactersToSearch) {
              return `Enter at least ${giphyOptionsCombined.minimumCharactersToSearch} characters!`
            }
          },
          showCancelButton: true,
          confirmButtonText: 'Search',
          showLoaderOnConfirm: true,
          preConfirm: (searchInput) => {
            const encodedSearch = encodeURIComponent(searchInput);
            const giphyRequest = fetch(`${giphyOptionsCombined.apiBase}/gifs/search?q=${encodedSearch}&api_key=${giphyOptionsCombined.apiKey}&limit=5`)
              .then(response => response.json())
              .then((response) => {
                if (response.data && typeof response.data === 'object') {
                  return response.data.map(item => {return { value: item.images.original.url, icon: `<img src="${item.images.original.url}" title="Select ${item.title}" alt="Select ${item.title}"/>`}});
                }
              }).catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
            return giphyRequest;
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          const inputOptions = new Promise((resolve) => {
            resolve(result.value.reduce((reducedItems, item) => {
              reducedItems[item.value] = item.icon;
              return reducedItems;
            }, {}))
          })
          
          if (result.isConfirmed) {
            return Swal.fire({
              customClass: {
                container: 'ckeditor-giphy-modal',
              },
              title: 'Select result',
              input: 'radio',
              inputOptions: inputOptions,
              inputValidator: (value) => {
                if (!value) {
                  return 'You need to choose something!'
                }
              },
              showCancelButton: true,
            })
          }
        }).then((result) => {
          editor.model.change( writer => {
            const imageElement = writer.createElement( 'image', {
              src: result.value
            } );
  
            // Insert the image in the current selection location.
            editor.model.insertContent( imageElement, editor.model.document.selection );
          } );
        })
      } );

      return view;
    } );
  }
}

