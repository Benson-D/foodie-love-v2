import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useToggle from "~/hooks/useToggle";

import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs';

/**
 * Individual list card that displays a recipe
 *
 * Props:
 *    recipe: { id, recipeName, prepTime, cookingTime, mealType, recipeImage }
 * State: none
 *
 * RecipeList -> ListCard
 */
function FoodieCard({
  cardData,
  children,
}: {
  cardData: {
    id: string;
    title: string;
    subheader?: string;
    image: string | null;
    isLiked: boolean;
  };
  children: JSX.Element;
}) {

  const [value, toggleValue] = useToggle(cardData.isLiked);
  const { mutate: mutateAddFavorite } = api.recipe.addFavorite.useMutation();
  const { mutate: mutateRemoveFavorite } = api.recipe.removeFavorite.useMutation();

  const { user } = useUser();

  const handleCardButtonEvent = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();

    if (value) {
      mutateRemoveFavorite({ userId: user?.id ?? '000', recipeId: cardData.id });
    } else {
      mutateAddFavorite({ userId: user?.id ?? '000', recipeId: cardData.id });
    }

    toggleValue(!value);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        cursor: "pointer",
        margin: "0 auto",
      }}
    >
      <CardHeader
        titleTypographyProps={{
          fontSize: 14,
          textTransform: "capitalize",
        }}
        subheaderTypographyProps={{
          fontSize: 11,
        }}
        title={cardData?.title}
        subheader={cardData?.subheader ?? "N/A"}
        action={
          <IconButton onClick={(evt) => handleCardButtonEvent(evt)}>
            <FavoriteIcon sx={{ color: `${value ? "#ee5050" : "inherit"}` }} />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={!cardData.image ? "/img/default-image.jpg" : cardData.image}
        alt="main-recipe-image"
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default FoodieCard;