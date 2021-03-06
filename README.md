# Vendasta Node SDK

## Installation ##

```
npm install --save vendasta-sdk
```

## Usage ##
Note: The authentication mechanism is likely to change. Currently, it's done via a static oauth token. (ask us for one).
You can hit the test environment for now. Production is not yet available.
Better documentation is coming later, for now this readme can serve as a quick start guide.


### Creating a Client ###

You'll use the client to interact with either our test or production (coming soon) servers.
Creating the client is easy

#### Typescript ####
``` typescript
import {Client, Environment} from "vendasta-sdk/src/index"
client: Client = new Client(Environment.TEST, "my-access-token");
```

#### Javascript ####
``` javascript
var vendastaSdk = require("vendasta-sdk");
var client = new vendastaSdk.Client(vendastaSdk.Environment.TEST, "my-access-token");
```


### Retrieving a Listing / Deleting a Listing ###
Retrieve a listing with
``` typescript
client.getListing;
```
Delete a listing with
``` typescript
client.deleteListing;
```

#### Arguments ####

- listingId: string => This is available from the Listing object after it has been saved.

- callback: any  => Runs when the listing is retrieved. Signature is callback(error: string, listing: Listing)

#### Typescript ####
``` typescript
import {Listing} from "vendasta-sdk/src/index";
let listing: Listing = client.getListing("listing-id", callback);
client.deleteListing("other-listing-id", callback);
```

#### Javascript ####
``` javascript
var listing = client.getListing("listing-id", callback);
client.deleteListing("other-listing-id", callback)
```

### Saving a Listing ###
``` typescript
client.putListing;
```

This will either save a new listing, or update the existing one with the given listing id.

NOTE: A newly created listing's listing id will be ignored. YOU SHOULD NEVER SET THE LISTING ID.

#### Arguments ####
- listing: Listing

- callback: any => Runs when the listing is retrieved. Signature is callback(error: string, listing: Listing)

#### Typescript ####
``` typescript
import {Client, Listing, Environment} from "vendasta-sdk/src/index";
client: Client = new Client(Environment.TEST, "my-access-token";
listing: Listing = new Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId";
listing.url = "http://www.vendasta.com";

```

#### Javascript ####
``` javascript
var vendastaSdk = require("vendasta-sdk");
var listing = new vendastaSdk.Listing();
var client = new vendastaSdk.Client(vendastaSdk.Environment.TEST, "my-access-token")
listing.address = "123 Test Dr.";
listing.external_id = "externalId";
listing.url = "http://www.vendasta.com";
client.putListing(listing, callback)
```


### Retrieving a Review / Deleting a Review ###
Retrieve a review with
``` typescript
client.getReview;
```
Delete a review with
``` typescript
client.deleteReview;
```

#### Arguments ####

- reviewId: string => This is available from the Review object after it has been saved.

- callback: any  => Runs when the review is retrieved. Signature is callback(error: string, review: Review)

#### Typescript ####
``` typescript
import {Review} from "vendasta-sdk/src/index";
let review: Review = client.getReview("review-id", callback);
client.deleteReview("other-review-id", callback);
```

#### Javascript ####
``` javascript
var review = client.getReview("review-id", callback);
client.deleteReview("other-review-id", callback)
```

### Saving a Review ###
``` typescript
client.putReview;
```

NOTE: If you supply a review ID, that ID will be used to update an existing review, if it exists.
If you do not supply an ID, it will create a new review.

#### Arguments ####
- review: Review
- callback: any => Runs when the review is retrieved. Signature is callback(error: string, review: Review)

#### Typescript ####
``` typescript
import {Client, Review, Environment} from "vendasta-sdk/src/index";
client: Client = new Client(Environment.TEST, "my-access-token";
// create a listing or get an existing listing here ...
review: Review = new Review();
review.listing_id = listing.listing_id;
review.external_id = "externalId";
review.star_rating = 5.0;
client.putReview(review, callback);
```

#### Javascript ####
``` javascript
var vendastaSdk = require("vendasta-sdk");
var client = new vendastaSdk.Client(vendastaSdk.Environment.TEST, "my-access-token");
// create a listing or get an existing listing here ...
var review = new vendastaSdk.Review();
review.listing_id = listing.listing_id;
review.external_id = "externalId";
review.star_rating = 5.0;
client.putReview(review, callback);
```

### Retrieving a list of reviews ###
NOTE:: You can either specify listingId or listingExternalId, not both.
listingId: The listing_id of the Listing to get the reviews for.
listingExternalId: The external_id of the Listing to get the reviews for.
page_size: The number of reviews to return with each request.
offset: How far into the batch of reviews you are.

#### Typescript ####
``` typescript
import {Client, Review, Environment} from "vendasta-sdk/src/index";
client: Client = new Client(Environment.TEST, "my-access-token";
// assume a listing with some reviews here ...
let pageSize = 10;
let offset = 0;

var reviews: Review[];
client.listReviews(listingId, pageSize, offset, getAllReviews);

function getAllReviews(error: string, listedReviews: [Review]) {
    if (listedReviews.length > 0) {
        reviews = reviews.concat(listedReviews);
        offset += pageSize;
        client.listReviews(listingId, null, page_size, offset, getAllReviews);
    }
    else {
        return;
    }
}
```

#### Javascript ####
``` javascript
var vendastaSdk = require("vendasta-sdk");
var client = new vendastaSdk.Client(vendastaSdk.Environment.TEST, "my-access-token");
// assume a listing with some reviews here ...
var page_size = 10;
var offset = 0;

var reviews = [];
client.listReviews(listingId, pageSize, offset, getAllReviews);

function getAllReviews(error, listedReviews) {
    if (listedReviews.length > 0) {
        reviews = reviews.concat(listedReviews);
        offset += pageSize;
        client.listReviews(listingId, null, page_size, offset, getAllReviews);
    }
    else {
        return;
    }
}
```

### Quickstart ###
See `listingExample.ts` and `reviewExample.ts` in vendasta-sdk/example [here](https://github.com/vendasta/vendasta-node-sdk/tree/master/example)


## Objects ##
### Listing ###
*The Listing class is used when interacting with the client.

#### Required Fields ####
- external_id: string =>  This is your ID for this listing.
- url: string => The URL where the listing can be found. (Not to be confused with the business’ website, above.)

#### Optional Fields ####
- listing_id: string => The id used to identify the listing. This will only be set after saving the listing.
- company_name: string => The name of the company the listing represents.
- address: string => The address of the company the listing represents.
- city: string => The city the business resides in.
- state: string => The state / province  the business resides in.
- country: string => The country the business resides in.
- zip_code: string => The zip code / postal code of the business.
- location: Geo => The latitude and longitude of the business location.
- business_categories: array<string> =>  A list of categories that describes the business the listing represents.
- phone: string =>  The primary contact number for the business.
- additional_phone_numbers: Array<string> =>  Numbers that are registered for the business, but is not the primary contact number.
- average_review_rating: number =>  The average review rating for the business (if applicable) across reviews for this listing.
- website: string => The website owned by the business. Not to be confused with the URL of the listing itself (see url below).

### Geo ###
*This simple class is used to set the location of the listing.*
- latitude: number => latitudinal location of the listing.
- longitude: number => longitudinal location of the listing.

### Review ###
*The Review class is used when interacting with the client.

#### Required Fields ####
- listing_id: string => The ID of the listing this review belongs to.

#### Optional Fields ####
- review_id: string => The ID used to identify the listing. This will only be set after saving the listing.
- url: string => The URL to the review.
- title: string => The title of the review.
- star_rating: number => The rating of the review.
- reviewer_name: string => The name of the reviewer who created the review.
- reviewer_email: string => The email address of the reviewer.
- reviewer_url: string => The URL to the reviewer's profile.
- content: string => The full text content of the review.
- published_date: Timestamp => The date on which the review was published.

### Empty ###
*This is an empty object from GRPC.*
- It has no fields.

### Timestamp ###
*This is a timestamp object from GRPC.*
- seconds: number => The number of seconds after (positive) or before (negative) the 1970 epoch.
- nanos: number => The fractional portion of the last second, in nanoseconds. This number must always be positive, even for negative timestamps.


## Development ##
*You must clone the repository to use these features*

A docker container and a build script is provided to run any Node/NPM related commands without needing to have Node installed on your computer.

By default, the build script will run the typescript compiler in watch mode: `tsc -w` (you must be running the docker for mac or docker for windows application for watch mode to work).

For example, to compile the typescript, run:
```
./build.sh tsc # Use the -w flag to have the typescript compiler incrementally compile changes
```
To install the node_modules folder locally, run:
```
./build.sh npm install
```
To install any extra [typings](https://github.com/typings/typings), run:
```re
./build.sh typings # (any command typings supports)
```
To regenerate the documentation, run:
```
./build.sh jsdoc -c jsdoc_conf.json
```

### Testing ###
Tests are using jasmine-node-karma. To run the tests, use
```
npm test
```
