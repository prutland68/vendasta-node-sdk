## 0.3.0
### Added support for reviews.
- Put a Review
- Get a Review
- Delete a Review
- List Reviews via pagination.
### Misc.
- Changed how internal error handling is done.
- Changed message passing of the gRPC listing service.
- Hand-rolled `listing.d.ts` and `review.d.ts`, removed proto2typescript.
-- Got rid of weird typecasting in usage of listing and review objects.

## 0.2.0
- Finished the client class. This includes putListing, getListing, and deleteListing.
- Listing and Geo classes can be imported and used from index without compile errors.

## 0.1.0
- Initial Release
