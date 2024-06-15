import { type JsonArray } from "@prisma/client/runtime/library";


/**
 * The data of an authorized user, including token
 */
interface IAuthUserData {
	user: IAutherUser;
	token: string;
  }
  
  /**
   * The data of an authorized user
   */
  interface IAutherUser {
	id: string;
	username: string | null;
	email: string;
	firstName: string;
	lastName: string;
	imageUrl: string | null;
	role: string;
  }
  
  /**
   *  The list daata of recipes
   */
  interface IAllRecipes {
	recipes: {
	  id: string;
	  name: string;
	  prepTime: string | null;
	  cookingTime: string;
	  mealType: string | null;
	  recipeImage: string | null;
	  user: {
		userId: string;
	  }[];
	}[];
  }
  
  /**
   * A single recipe items,
   * retrieved from a get request
   */
  interface ISingleRecipe {
	id: string;
	name: string;
	createdAt: Date | string;
	createdBy: string;
	prepTime: number | null;
	cookingTime: number;
	recipeImage: string | null;
	mealType: string | null;
	instructions: InstructionItems[] | JsonArray;
	ingredients: ISingleIngredientList[];
  }
  
  /**
   * Each Ingredient List item,
   * retrieved from a get request
   */
  interface ISingleIngredientList {
	amount: number;
	ingredientId: string;
	ingredient: {
	  name: string;
	};
	measurementUnitId: string | null;
	measurementUnit: {
	  description: string;
	} | null;
  }
  
  /**
   * Optional parameters in a get request search
   */
  interface IAllRecipesParams {
	recipeName?: string;
	cookingTime?: number;
	mealType?: string;
	skip: number;
	userId?: string;
  }
  
  /**
   * General data input from recipe form when submitted
   */
  interface IRecipeFormData {
	recipeName: string;
	mealType: string;
	prepTime: number;
	cookingTime: number;
	instructions: InstructionItems[];
	ingredientList: IngredientItems[];
	recipeImage: string;
	userId: string;
  }
  
  interface IUpdateRecipeData extends IRecipeFormData {
	id: string;
  }
  
  /**
   * The return of the created recipe
   */
  interface CreatedRecipe {
	id: number;
	ingredients: {
	  recipeId: number;
	  ingredientId: string;
	  measurementId: string | null;
	  amount: string;
	}[];
  }
  
  interface IAddFavRecipe {
	added: IFavRecipeParams;
  }
  
  interface IRemoveFavRecipe {
	deleted: IFavRecipeParams;
  }
  
  interface IFavRecipeParams {
	userId: string;
	recipeId: string;
  }
  
  /**
   * A single list container that is associated with a recipe,
   * Generally used within a form submission
   *
   */
  interface IngredientItems {
	amount: string;
	measurement: string;
	ingredient: string;
  }
  
  /**
   * A single item of each instruction
   */
  interface InstructionItems {
	instruction: string;
  }
  
  /**
   * A generic type of props passed in form field component
   */
  interface IFormFieldProps {
	index: number;
	removeItemCb: (index: number) => void;
  }
  
  export type {
	IAuthUserData,
	IAutherUser,
	IAllRecipes,
	ISingleRecipe,
	IAllRecipesParams,
	IRecipeFormData,
	IUpdateRecipeData,
	CreatedRecipe,
	IAddFavRecipe,
	IRemoveFavRecipe,
	IFavRecipeParams,
	IngredientItems,
	InstructionItems,
	IFormFieldProps,
};
  