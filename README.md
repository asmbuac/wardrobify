# Wardrobify

Team:

* Sinlin Yeo - Hats
* Shayne Buac - Shoes

## Design
<img src="/Microservice-Two-Shot-Diagram.png">

## Shoes microservice

### Summary
The Shoes microservice consists of two microservices: **api** and **poll**.

Api is a Django application with a Django project, `shoes_project`, and a Django app, `shoes_rest`, where the latter handles create, read, and delete functionality for shoes (`Shoe` objects) that are assigned to a specific bin (`BinVO`) in a user's wardrobe.

Poll is an application that contains a poller that gets `Bin` data from the wardrobe API every 60 seconds and creates or updates a `BinVO` object. Then, use React to render a dynamic single page app using various components, such as `ShoesList`, `ShoeForm`, and `DeleteButton`, that allow the user to interact with the website and create, read, and delete shoes (`Shoe` objects) that are assigned to a specific bin (`BinVO`) in their wardrobe.

### Outline
##### Models:

- [x] `Shoe`
  - manufacturer
  - model_name
  - color
  - picture_url
  - bin (Foreign Key to BinVO)
- [x] `BinVO` - Same properties as Bin model + import_href
  - import_href
  - closet_name
  - bin_number
  - bin_size

##### RESTful API (Port 8080):

| Method | URL | What it does | View function | Notes |
| ------ | ------ | ------ | ------ | ------ |
|   GET  |    `/api/shoes/`    |    List all shoes     | `api_shoes` |
| GET | `/api/bins/<int:bin_vo_id>/shoes/` | List shoes in one bin | `api_shoes` | Use in the back-end to double check which shoes were added to which bin |
|    POST    |   `/api/shoes/`     |    Create a new shoe    | `api_shoes` |
| GET | `/api/shoes/<int:pk>/` | Show shoe details | `api_shoe` |
| DELETE | `/api/shoes/<int:pk>/` | Delete a shoe | `api_shoe` |

##### Poller:
- One poller to poll the Wardrobe API for `Bin` resources every 60 seconds
- Created a `get_bins` function that:
  - Requests for and gets bin data from Wardrobe microservice and create or update a `BinVO` object
  - Grabs the response's content and translates it from JSON to Python
  - Iterates through the bins and updates or creates a `BinVO` object from the Bin data

##### React:
- Components:
  - `ShoesList` - Fetches the details of the all the shoes from the `Shoe` API, passes these details as props to the ShoeColumn component, and then renders the overall look of the "/shoes" page
  - `ShoeColumn` - Utilizes a `shoeList` property passed down from `ShoesList`  that contains the data for each specific shoes and returns 3 columns containing cards that display a shoe and its details. Also uses the `DeleteButton` component as part of the card text.
  - `ShoeForm` - Returns a form that allows users to create a new shoe
  - `DeleteButton` - Renders a button that deletes a specific object––in this case, a specific shoe––when it is clicked

- React Router
  - Used `BrowserRoutes`, `Routes`, and `Route` from  `react-router-dom` to create paths for `ShoeList` and `ShoeForm` within the `App.js` file where:
    - `ShoeList` is the index child route for shoes (i.e., "/shoes" => `ShoeList`)
    - `ShoeForm` is a sibling route of `ShoeList`'s route ("/shoes/new" => `ShoeForm`)

## Hats microservice

The **Hats** microservice was created with reference to the **Shoes** microservice with some of the key differences highlighted below.

### Summary
The `Hats` microservice, like the `Shoes` microservice, consists of **api** and **poll**.

TLDR; the design works the same way as `Shoes`, with the following changes

### Outline
##### Models:

- [x] `Hat`
  - fabric
  - style_name
  - color
  - picture_url
  - location (Foreign Key to LocationVO)
- [x] `LocationVO` - Same properties as Location model + import_href
  - import_href
  - closet_name
  - section_name
  - shelf_number

##### RESTful API (Port 8090):

| Method | URL | What it does | View function | Notes |
| ------ | ------ | ------ | ------ | ------ |
|   GET  |    `/api/hats/`    |    List all hat     | `api_hats` |
|    POST    |   `/api/hats/`     |    Create a new hat    | `api_hats` |
| GET | `/api/hats/<int:pk>/` | Show hat details | `api_hat` |
| DELETE | `/api/hats/<int:pk>/` | Delete a hat | `api_hat` |

##### Poller:
- One poller to poll the Wardrobe API for `Location` resources every 10 seconds
- Created a `get_locations` function that:
  - Requests for and gets location data from Wardrobe microservice and create or update a `LocationVO` object
  - Grabs the response's content and translates it from JSON to Python
  - Iterates through the locations and updates or creates a `LocationVO` object from the Location data

  ---END---
