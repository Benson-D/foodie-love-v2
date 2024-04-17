import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod';
import RecipeController from "../controllers/RecipeController";

export const recipeRouter = createTRPCRouter({
	getAll: publicProcedure
	.input(z.object({
		searchFilters: z.object({
			recipeName: z.string()
		}),
		skip: z.number()
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
				mealType: true
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
	.input(String)
	.query(({ input, ctx }) => {
		const foundRecipe = ctx.db.recipe.findUnique({
			where: { id: input },
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
	})
});