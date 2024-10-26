import { Product } from '../products.ts';
import { UserType } from '../models/UserType.ts';

export const MAX_REGISTER_DISCOUNT = 10;
export const MAX_VIP_DISCOUNT = 25;

const VIP_ADDITIONAL_DISCOUNT = 5;
const NO_DISCOUNT = 0 as const;

export function getDiscount(
  products: Array<Product>,
  userType: UserType | UserType.REGISTER | UserType.GUEST
) {
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  if (totalQuantity === 0) return NO_DISCOUNT;

  if (UserType.isGuest(userType)) {
    return NO_DISCOUNT;
  }

  if (UserType.isRegister(userType)) {
    switch (totalQuantity) {
      case 1:
        return 2;
      case 2:
        return 5;
      default:
        return MAX_REGISTER_DISCOUNT;
    }
  }

  if (UserType.isVip(userType)) {
    let result = 0;
    switch (totalQuantity) {
      case 1:
        result = 5;
        break;
      case 2:
        result = 10;
        break;
      default:
        result = 20;
        break;
    }
    result += VIP_ADDITIONAL_DISCOUNT;
    return result;
  }
}
