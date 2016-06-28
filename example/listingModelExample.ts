console.log("##################LISTINGMODEL############################");
let vListingModel: ListingModel = new ListingModel(client);
vListingModel.externalId = "vendasta-technologies-12345";
vListingModel.companyName = "Vendasta Technologies Inc.";
vListingModel.businessCategories[0] = "Marketing";
vListingModel.additionalPhoneNumbers[0] = "1-306-555-1212";
vListingModel.address = "Suite 405, Avenue Building";
vListingModel.averageReviewRating = 5;
vListingModel.city = "Saskatoon";
vListingModel.state = "SK";
vListingModel.country = "CA";
vListingModel.location.latitude = 52.1265741;
vListingModel.location.longitude = -106.6648763;
vListingModel.numberOfReviews = 17;
vListingModel.phone = "1-306-955-5512";
vListingModel.url = "www.example-source.com/vendasta-technologies-12345";
vListingModel.website = "www.vendasta.com";
vListingModel.zipCode = "S7K 1M1";

// Save the vListingModel.
listing = vListingModel.save(null);

// Get the vListingModel. The returned object has the channel set on it.
var gotListing = ListingModel.getListingById(listing.vendasta_id, client, null);

// Delete the vListingModel.
gotListing.delete(null);
