import { UserDTO } from "../Dtos/user/user.dto";
import { AddWilistItemDTO } from "../Dtos/wishlist/add.dto";
import { ReadWilistItemDTO } from "../Dtos/wishlist/read.dto";
import { RemoveWilistItemDTO } from "../Dtos/wishlist/remove.dto";
import { WishlistItemDTO } from "../Dtos/wishlist/wishlist.dto";

import { WishlistItem } from "../models/wishlist.item.model";
import { Wishlist } from "../models/wishlist.model";
import WishlistRepository from "../repositories/wishlist.repository";

class WishlistService {
  private wishlistRepository = WishlistRepository;
  constructor() {}
  async getAll(userDTO: UserDTO): Promise<Wishlist | null> {
    const model = await this.wishlistRepository.getAll(userDTO);
    return model;
  }

  async add(
    // userDTO: UserDTO,
    itemDTO: AddWilistItemDTO
  ): Promise<WishlistItem | null> {
    const model = await this.wishlistRepository.add(itemDTO);
    return model;
  }
  async remove(dto: RemoveWilistItemDTO): Promise<any> {
    const result = await this.wishlistRepository.remove(dto);
    return result;
  }

  async getById(dto: ReadWilistItemDTO): Promise<WishlistItemDTO | null> {
    const model = await this.wishlistRepository.getById(dto);
    return model;
  }
}
export default new WishlistService();
