import { useState, type ChangeEvent } from "react";
import Link from 'next/link';

import { api } from "~/utils/api";

import { Box, Grid, Typography } from "@mui/material";

import useDebounce from "~/hooks/useDebounce";
import FoodieCard from "~/components/FoodieCard";
import SearchBar from "~/components/SearchBar";
import MainModal from "~/components/MainModal";
import CreateRecipeForm from "~/features/recipeForm/CreateForm";

import { useUser } from "@clerk/nextjs";

export default function Recipes() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [skip, setSkip] = useState<number>(0);
	const debounceValue = useDebounce(searchTerm);
	const { user } = useUser();
	
	const { data: recipes } = api.recipe.getFilteredRecipes.useQuery({ 
		searchFilters: {
			recipeName: debounceValue
		},
		skip,
		userId: user?.id ?? '000' 
	}); 

	/** Handles search event handler, updates state */
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value.trim());
	
		if (e.target.value.trim() || e.target.value.trim() === "") {
		  setSkip(0);
		}
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { offsetHeight, scrollTop, scrollHeight } = e.currentTarget;
	
		if (offsetHeight + scrollTop >= scrollHeight - 5) {
			setSkip(recipes?.length ?? 0);
		}
	};

	return (
		<Box minHeight="100vh">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexDirection: { xs: "column-reverse", sm: "row" },
					px: 5,
					py: 2
				}}
			>
				<MainModal buttonLabel="Create Recipe">
					<CreateRecipeForm />
				</MainModal>
				<Box
					sx={{
						marginBottom: { xs: 2, sm: 0 },
						width: { xs: "100%", sm: "auto" },
					}}
					>
						<SearchBar handleSearch={handleSearch} />
				</Box>
      		</Box>
			<Box
				sx={{ height: "calc(100vh - 100px)", overflowY: "auto" }}
				onScroll={handleScroll}
			>
				<Grid container spacing={2} sx={{ padding: 5 }}>
					{recipes?.map((recipe, idx) => (
						 <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
							<Link
								href={`/recipes/${recipe.id}`}>
									<FoodieCard
										cardData={{
										id: recipe.id,
										title: recipe.name,
										subheader: recipe.mealType ?? "other",
										image: recipe.recipeImage,
										isLiked: recipe.user.length > 0,
										}}
									>
										<>
											<Typography sx={{ fontSize: "12px" }}>
											Prep Time: {`${recipe?.prepTime} minutes`}
											</Typography>
											<Typography sx={{ fontSize: "12px" }}>
											Cooking Time: {`${recipe.cookingTime} minutes`}
											</Typography>
										</>
									</FoodieCard>
							</Link>
						 </Grid>
					))}
				</Grid>
			</Box>
		</Box>
	)
}