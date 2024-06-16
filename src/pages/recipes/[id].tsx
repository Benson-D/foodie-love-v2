import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from 'next/link';
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { useRouter } from 'next/router'

import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";

import {
	Box,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Divider,
	Typography,
  } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import MainModal from '~/components/MainModal';
import EditRecipeForm from '~/features/recipeForm/EditRecipeForm';
import { type ISingleRecipe, type IUpdateRecipeData, type InstructionItems } from "~/interface";

const convertTimeToFormattedString = (
	foodieTime: number | null | undefined,
): string => {
	if (!foodieTime) return "0 minutes";
	const minuteStatement = Number(foodieTime) > 1 ? "minutes" : "minute";
	
	return `${foodieTime} ${minuteStatement}`;
};

function convertToFraction(num: number): string {
	if (Number.isInteger(num)) return String(Math.round(num));
  
	const wholeNumberPart = Math.floor(num);
	const decimalPart = num - wholeNumberPart;
  
	const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
	const denominator: number = 1 / decimalPart;
	const divisor: number = gcd(1, denominator);
  
	const wholeNumberFraction = wholeNumberPart > 0 ? `${wholeNumberPart} ` : "";
  
	return wholeNumberFraction + `${1 / divisor}/${denominator / divisor}`;
}


function formatInitialEditValues(recipeData: ISingleRecipe): IUpdateRecipeData {
	const formattedIngredients = recipeData.ingredients.map(
	  ({ amount, ingredient, measurementUnit }) => {
		return {
		  amount: convertToFraction(Number(amount)),
		  ingredient: ingredient.name,
		  measurement: measurementUnit?.description ?? "",
		};
	  },
	);
  
	return {
	  id: recipeData.id,
	  recipeName: recipeData.name,
	  mealType: recipeData?.mealType ?? "",
	  prepTime: Number(recipeData.prepTime) ?? 0,
	  cookingTime: Number(recipeData.cookingTime),
	  ingredientList: formattedIngredients,
	  instructions: recipeData.instructions as InstructionItems[],
	  recipeImage: recipeData.recipeImage ?? '',
	  userId: ""
	};
}

function SinglePageRecipe() {
	const router = useRouter();
	const { id } = router.query;
	const { user } = useUser();

	if (typeof id !== "string") return <p>Not Found</p>;
	
	const { data } = api.recipe.getById.useQuery({ id });

	if(!data) return <p>Not Found</p>;

	const recipeInstructions: { instruction: string;}[] = 
	(data?.instructions && Array.isArray(data?.instructions)) 
		? data.instructions as { instruction: string; }[] 
		: [];

	return (
	<>
		<Head>
			<title>{data?.name ?? "Recipe Detail"}</title>
		</Head>
		<Box sx={{ marginTop: 5 }}>
			<Card
			sx={{
			maxWidth: { xs: 380, sm: 550, md: 700 },
			boxShadow: 3,
			cursor: "pointer",
			margin: "0 auto",
			}}
			>
				<CardHeader
				title={data?.name}
				subheader={data?.mealType}
				action={<Link href="/recipes"><Button>Back</Button></Link>}
				sx={{ textTransform: "capitalize" }}
				/>
				<CardMedia
				component="img"
				height="300"
				image={data?.recipeImage ? data.recipeImage : "/img/default-image.jpg"}
				alt="fight-map"
				/>
				<CardContent>
				<Divider>
					<AccessAlarmIcon />
				</Divider>
				<Box
					sx={{
					display: "flex",
					justifyContent: "space-between",
					paddingX: 6,
					}}
				>
					<Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
					Prep Time
					</Typography>
					<Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
					Cooking Time
					</Typography>
				</Box>
				<Box
					sx={{
					display: "flex",
					justifyContent: "space-between",
					paddingX: 8,
					}}
				>
					<Typography sx={{ fontSize: "15px" }}>
					{convertTimeToFormattedString(data?.prepTime)}
					</Typography>
					<Typography sx={{ fontSize: "15px" }}>
					{convertTimeToFormattedString(data?.cookingTime)}
					</Typography>
				</Box>
				<Divider sx={{ marginY: 3 }} textAlign="center">
					<Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
					Ingredients
					</Typography>
				</Divider>
				<Box>
					{data?.ingredients.length
					? data.ingredients.map((item, idx) => (
						<Typography key={idx}>
							&bull;{" "}
							{`${convertToFraction(Number(item.amount))} ${
							item?.measurementUnit?.description ?? ""
							} ${item?.ingredient.name}`}
						</Typography>
						))
					: "No ingredients"}
				</Box>
				<Divider sx={{ marginY: 3 }} textAlign="center">
					<Typography variant="h4" sx={{ fontSize: "20px", color: "grey" }}>
					Instructions
					</Typography>
				</Divider>
				<Box>
					{recipeInstructions.length > 0
					? recipeInstructions.map((item, idx) => (
						<Typography key={idx}>&bull; {item.instruction}</Typography>
						))
					: "No ingredients"}
				</Box>

				{user?.id === data?.createdBy && (
					<Box sx={{ marginTop: 4 }}>
					<MainModal buttonLabel="Edit">
						<EditRecipeForm initialValues={formatInitialEditValues(data as ISingleRecipe)}/>
					</MainModal>
					</Box>
				)}
				</CardContent>
			</Card>
		</Box>
	</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = generateSSGHelper();

	const { id } = context.params as { id: string };

	if (typeof id !== "string") throw new Error("no id");

	await ssg.recipe.getById.prefetch({ id });

	return {
		props: {
		  trpcState: ssg.dehydrate(),
		  id,
		},
	};
}


export const getStaticPaths = () => {
	return { paths: [], fallback: "blocking" };
};
  

export default SinglePageRecipe;