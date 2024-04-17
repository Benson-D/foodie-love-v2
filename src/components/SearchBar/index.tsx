import { type ChangeEvent } from "react";
import { Paper, Divider, InputBase, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { StyledSearch } from "./StyledSearch";

/**
 * Main search bar component
 * Props: handleSearch: eventHandler
 * State: none
 */
function SearchBar({
  handleSearch,
}: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <StyledSearch>
      <Paper sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ p: "10px" }}>
          <SearchOutlined />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Recipes"
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearch}
        />
      </Paper>
    </StyledSearch>
  );
}

export default SearchBar;