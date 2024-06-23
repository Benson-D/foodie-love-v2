import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import RecipeController from "../controllers/RecipeController";

function parseRecipeIngredientAmount(amount: string): number {
	let parsedAmount = amount;

	if (amount.includes("/")) {
	  parsedAmount = amount
		.split("/")
		.map(Number)
		.reduce((total, amount) => total / amount)
		.toString();
	}
  
	return parseFloat(parsedAmount);
}

export const recipeRouter = createTRPCRouter({
	getAll: publicProcedure
	.query(async ({ ctx }) => {
		const recipes = await ctx.db.recipe.findMany({
			select: {
				id: true,
				name: true       
			},
			orderBy: {
				id: "asc"
			}
		});

		return recipes;
	}),
	getFilteredRecipes: publicProcedure
	.input(z.object({
		searchFilters: z.object({
			recipeName: z.string()
		}),
		skip: z.number(),
		userId: z.string() 
	}))
	.query(({input, ctx}) => {
		const { skip, searchFilters } = input;
		const { recipeName } = searchFilters;

		const recipes =  ctx.db.recipe.findMany({
			where: {
				AND: [
				  recipeName ? { name: { contains: recipeName } } : {},
				],
			},
			select: {
				id: true,
				name: true,
				cookingTime: true,
				prepTime: true, 
				recipeImage: true,
				mealType: true,        
				user: {
					select: {
					  userId: true,
					},
					where: {
					  userId: input.userId,
					}
				},
			},
			orderBy: {
				id: "asc"
			},
			// skip: skip,
			// take: 10,
		});

		return recipes;
	}),
	getById: publicProcedure
	.input(z.object({
		id: z.string()
	}))
	.query(async ({ input, ctx }) => {
		const foundRecipe = await ctx.db.recipe.findUnique({
			where: { id: input.id },
			include: {
			  ingredients: {
				select: {
				  ingredientId: true,
				  ingredient: {
					select: {
					  name: true,
					},
				  },
				  measurementUnitId: true,
				  measurementUnit: {
					select: {
					  description: true,
					},
				  },
				  amount: true,
				},
			  },
			},
		  });

		return foundRecipe;
	}),
	getAllMeasurements: publicProcedure.query(async ({ ctx }) => {
		const foundMeasurements = await ctx.db.measurementUnit.findMany({
			where: {
			  description: {
				not: undefined,
			  },
			},
			select: {
			  description: true,
			},
			orderBy: {
				description: 'asc',
			},
		});

		const measurementOutput = RecipeController.formatMeasurements(foundMeasurements);
		return measurementOutput;
	}),
	createRecipe: publicProcedure
	.input(z.object({
		recipeName: z.string(),
		mealType: z.string(),
		prepTime: z.number(),
		cookingTime: z.number(),
		recipeImage: z.string(),
		ingredientList: z.array(z.object({
			amount: z.string(),
			measurement: z.string(),
			ingredient: z.string()
		})),
		instructions: z.array(z.object({
			instruction: z.string()
		})),
		userId: z.string()
	}))
	.mutation(async ({ input, ctx }) => {
		const recipe = await ctx.db.recipe.create({
			data: {
			  name: input.recipeName,
			  prepTime: input.prepTime ?? null,
			  cookingTime: input.cookingTime,
			  recipeImage: input.recipeImage ?? null,
			  instructions: input.instructions,
			  mealType: input.mealType ?? null,
			  createdBy: input.userId,
			},
			select: {
			  id: true,
			},
		  });
		  
		  const recipeIngredients = await Promise.all(input.ingredientList.map(async(list: { 
			amount: string;
            measurement: string;
            ingredient: string;}) => {
				// Search for existing measurement
				let foundMeasurement = await ctx.db.measurementUnit.findFirst({
					where: { description: list?.measurement}
				});

				if (!foundMeasurement) {
					foundMeasurement = await ctx.db.measurementUnit.create({
						data: { description: list?.measurement }
					});
				}

				// Search for existing ingredient
				let foundIngredient = await ctx.db.ingredient.findFirst({
					where: { name: list?.ingredient }
				});

				if (!foundIngredient) {
					foundIngredient = await ctx.db.ingredient.create({
						data: { name: list.ingredient }
					});
				}

				// Create recipe ingredient 
				const createdRecipeIngredient = await ctx.db.recipeIngredient.create({
					data: {
					  recipeId: recipe.id,
					  ingredientId: foundIngredient.id,
					  measurementUnitId: foundMeasurement.id ?? null,
					  amount: parseRecipeIngredientAmount(list.amount)
					},
				  });
			  
				return createdRecipeIngredient;
			}));

		  return {
			'recipeId': recipe,
			'recipeIngredients': recipeIngredients.length
		  }
	}),
	updateRecipe:publicProcedure
	.input(z.object({
		recipeId: z.string(),
		recipeName: z.string(),
		mealType: z.string(),
		prepTime: z.number(),
		cookingTime: z.number(),
		recipeImage: z.string(),
		ingredientList: z.array(z.object({
			amount: z.string(),
			measurement: z.string(),
			ingredient: z.string()
		})),
		instructions: z.array(z.object({
			instruction: z.string()
		})),
	}))
	.mutation(async({input, ctx}) => {
		const foundRecipe = await ctx.db.recipe.findUnique({
			where: { id: input.recipeId }
		});

		if (!foundRecipe) throw new TRPCError({ code: "NOT_FOUND" });

		const updatedRecipe = await ctx.db.recipe.update({
			where: {
			  id: input.recipeId,
			},
			data: {
			  name: input.recipeName,
			  prepTime: input.prepTime ?? null,
			  cookingTime: input.cookingTime,
			  recipeImage: input.recipeImage ?? null,
			  mealType: input.mealType ?? null,
			  instructions: input.instructions,
			},
		  });

		const foundRecipeIngredients = await ctx.db.recipeIngredient.findMany({
			where: {
				recipeId: input.recipeId
			},
		});

		foundRecipeIngredients.map(async(recipeData) => {
			await ctx.db.recipeIngredient.delete({
				where: {
				  recipeId_ingredientId: {
					recipeId: recipeData.recipeId,
					ingredientId: recipeData.ingredientId,
				  },
				},
			  });
		})

		const recipeIngredients = await Promise.all(input.ingredientList.map(async(list: { 
			amount: string;
            measurement: string;
            ingredient: string;}) => {
				// Search for existing measurement
				let foundMeasurement = await ctx.db.measurementUnit.findFirst({
					where: { description: list?.measurement}
				});

				if (!foundMeasurement) {
					foundMeasurement = await ctx.db.measurementUnit.create({
						data: { description: list?.measurement }
					});
				}

				// Search for existing ingredient
				let foundIngredient = await ctx.db.ingredient.findFirst({
					where: { name: list?.ingredient }
				});

				if (!foundIngredient) {
					foundIngredient = await ctx.db.ingredient.create({
						data: { name: list.ingredient }
					});
				}

				// Create recipe ingredient 
				const createdRecipeIngredient = await ctx.db.recipeIngredient.create({
					data: {
					  recipeId: input.recipeId,
					  ingredientId: foundIngredient.id,
					  measurementUnitId: foundMeasurement.id ?? null,
					  amount: parseRecipeIngredientAmount(list.amount)
					},
				  });
			  
				return createdRecipeIngredient;
			}));

		return {
			'recipeId': updatedRecipe,
			'recipeIngredients': recipeIngredients.length
		}

	}),
	uploadRecipeImage: publicProcedure
	.input(z.any())
	.mutation(async(req) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const urlResponse = req;
		
		console.log(urlResponse, "<==== req for file upload");
		// const image = req.file || "";
		// let urlResponse = "";
	
		// if (image) {
		//   urlResponse = await uploadImageToS3(image);
		// }

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return urlResponse;
	}),
	addFavorite: publicProcedure
	.input(z.object({ 
		userId: z.string(), 
		recipeId: z.string()
	}))
	.mutation(async({input, ctx}) => {
		const foundRecipe = await ctx.db.recipe.findUnique({
			where: { id: input.recipeId }
		});

		if (!foundRecipe) throw new TRPCError({ code: "NOT_FOUND" });

		const addFavorite = await ctx.db.userFavoriteRecipe.create({
			data: {
			  userId: input.userId,
			  recipeId: foundRecipe.id,
			}
		});

		return addFavorite;
	}),
	removeFavorite: publicProcedure
	.input(z.object({		
		userId: z.string(), 
		recipeId: z.string()
	}))
	.mutation(async({input, ctx}) => {
		const foundRecipe = await ctx.db.recipe.findUnique({
			where: { id: input.recipeId }
		});

		if (!foundRecipe) throw new TRPCError({ code: "NOT_FOUND" })

		const removeFavorite = await ctx.db.userFavoriteRecipe.delete({
			where: {
				userId_recipeId: {
					userId: input.userId,
					recipeId: foundRecipe.id,
				}
			},
		});

		return removeFavorite;
	})
});