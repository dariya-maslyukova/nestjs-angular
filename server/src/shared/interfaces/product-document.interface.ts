import * as mongoose from 'mongoose';

import { Product } from './product.interface';

export interface ProductDocument extends Product, mongoose.Document {
}
