# Wardrobify

Team:

* Sinlin - Hats
* Shayne - Shoes

## Design

## Shoes microservice

Models:
- Shoes:
  - Manufacturer
  - Model name
  - Color
  - Picture url
  - Bin (Foreign Key to BinVO)
- BinVO: Same properties as Bin model + href
  - href
  - closet_name
  - bin_number
  - bin_size

RESTful API:
- List shoes (GET) - /api/shoes/
- Create a new shoes (POST) - /api/shoes/
- Delete a shoe (DELETE) - /api/shoes/<int:id>/

Poller:
- One poller to to poll the Wardrobe API for Bin resources
- Crontab:
  - Install crontab into the requirements.txt for the shoes app and shoe's poller
  - Add crontab logic in the shoes project settings
- Create a get_bins function to poll for bin data from Wardrobe API
  - Poll specifically from the list bin url path, and iterate thro
  - Grab response's content and change from json to python
  - Iterate through the bins and update or create a BinVO object from the Bin data

React:
- Components:
  - ListShoes
    - ShoeDetails (can put on same JS file as ListShoes or a separate JS file)
  - ShoeForm
  - DeleteShoe (does this need to be a component? SAVE FOR LAST)
    - Button with onClick and passing an arrow function that will return handleDelete
- React Router

## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
