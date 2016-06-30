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
```
typescript
import {Client, Environment} from "vendasta-sdk/index"
client: Client = new Client(Environment.TEST, "my-access-token";
```

#### Javascript ####
```
javascript
var vendastaSdk = require("vendasta-sdk/index");
var client = new vendastaSdk.Client(vendastaSdk.Environment.TEST, "my-fake-token");
```


### Retrieving a Listing / Deleting a Listing###
Retrieve a listing with
```
typescript
client.getListing;
```
Delete a listing with
```
typescript
client.deleteListing;
```

#### Arguments ####

- listingId: string => This is available from the Listing object after it has been saved.

- callback: any  => Runs when the listing is retrieved. Signature is callback(error: string, listing: Listing)

#### Typescript ####
```
typescript
import {Listing} from "vendasta-sdk/index";
let listing: Listing = client.getListing("listing-id", callback);
client.deleteListing("other-listing-id", callback);
```

#### Javascript ####
```
javascript
var listing = client.getListing("listing-id", callback);
client.deleteListing("other-listing-id", callback)
```

### Saving a Listing ###
```
typescript
client.putListing;
```

This will either save a new listing, or update the existing one with the same listing id.

NOTE: A newly created listing's listing id will be ignored. YOU SHOULD NEVER SET THE LISTING ID.

#### Arguments ####
- listing: Listing

- callback: any => Runs when the listing is retrieved. Signature is callback(error: string, listing: Listing)

#### Typescript ####
```
typescript
import {Client, Listing, Environment} from "vendasta-sdk/index";
client: Client = new Client(Environment.TEST, "my-access-token";
listing: Listing = new Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId";
listing.url = "http://www.vendasta.com";

```

#### Javascript ####
```
javascript
var vendastaSdk = require("vendasta-sdk/index");
var listing = new vendastaSdk.Listing();
var client = new vendastaSdk.Client(Environment.TEST, "my-access-token")
listing.address = "123 Test Dr.";
listing.external_id = "externalId";
listing.url = "http://www.vendasta.com";
client.saveListing(listing, callback)
```

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

- phone string =>  The primary contact number for the business.

- additional_phone_numbers: Array<string> =>  Numbers that are registered for the business, but is not the primary contact number.

- average_review_rating: number =>  The average review rating for the business (if applicable) across reviews for this listing.

- website: string => The website owned by the business. Not to be confused with the URL of the listing itself (see url below).




### Geo ###
*This simple class is used to set the location of the listing.*

- latitude: number => latitudinal location of the listing.

- longitude: number => longitudinal location of the listing.



### Quickstart ###
See example.ts in vendasta-sdk/example.


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
```
./build.sh typings # (any command typings supports)
```
To regenerate the documentation, run:
```
./build.sh jsdoc -c jsdoc_conf.json
```
To regenerate the proto objects files, run:
```
./build.sh bash build_proto_def.sh
```

### Testing ###
Tests are using jasmine-node-karma. To run the tests, use
```
npm test
```
