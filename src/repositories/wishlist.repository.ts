import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";
import { Wishlist } from "../models/wishlist.model";
import { WishlistItem } from "../models/wishlist.item.model";
import { AddWilistItemDTO } from "../Dtos/wishlist/add.dto";
import { RemoveWilistItemDTO } from "../Dtos/wishlist/remove.dto";
import { WishlistItemDTO } from "../Dtos/wishlist/wishlist.dto";
import ProductRepository from "./product.repository";

import { ReadWilistItemDTO } from "../Dtos/wishlist/read.dto";
import UserRepository from "./user.repository";
import { UserDTO } from "../Dtos/user/user.dto";
import { User } from "../models/user.model";

const WishlistTable = "wishlist";
class WishlistRepository {
  private db = knex(config.knex);
  private productRepository = ProductRepository;
  private userRepository = UserRepository;

  constructor() {}

  // Get all

  // Get all
  async getAll(userDTO: UserDTO): Promise<Wishlist | null> {
    const dtos = await this.db<WishlistItemDTO>(WishlistTable)
      .where("userId", userDTO.id)
      .select();

    const products = (
      await Promise.all(
        dtos.map(async (dto) => {
          return await this.productRepository.getById(dto.productId!);
        })
      )
    ).filter((product): product is Product => product !== null);

    const user: User = {
      id: userDTO.id,
      email: userDTO.email,
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      createdDate: userDTO.createdDate,
    };

    return {
      user: user,
      products: products,
    };
  }

  // Get by id
  async getById(dto: ReadWilistItemDTO): Promise<WishlistItemDTO | null> {
    const model = await this.db<WishlistItemDTO>(WishlistTable)
      .where("userId", dto.userId)
      .andWhere("productId", dto.productId)
      .first();

    return model ?? null;
  }

  // Create
  async add(itemDTO: AddWilistItemDTO): Promise<WishlistItem | null> {
    const [id] = await this.db<WishlistItemDTO>(WishlistTable)
      .insert(itemDTO)
      .returning("id");

    const model: WishlistItem = {
      id: Number(id),
      ...itemDTO,
    };

    return model;
  }

  // Remove
  async remove(dto: RemoveWilistItemDTO): Promise<any> {
    const result = await this.db<RemoveWilistItemDTO>(WishlistTable)
      .where("id", dto.id)
      .orWhere(function () {
        this.where("userId", dto.productId).andWhere(
          "productId",
          dto.productId
        );
      })
      .delete();
    return result;
  }
}
export default new WishlistRepository();
