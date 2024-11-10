import { BookDetailsResponse } from './book-details-response.model';
import { PageableResponse } from './pageble.response.model';

export type BookPageResponse = PageableResponse<BookDetailsResponse>;
