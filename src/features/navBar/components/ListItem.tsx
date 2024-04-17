import Link from 'next/link';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
  } from "@mui/material";
  
  interface ListProps {
	title: string;
	link: string;
	icon?: JSX.Element;
  }
  
  export default function ListItems({
	handleToggle,
	listItems,
  }: {
	handleToggle: () => void;
	listItems: ListProps[];
  }) {
	return (
	  <Box onClick={handleToggle} sx={{ textAlign: "center" }}>
		<List>
		  {listItems.map((item, idx) => (
			<ListItem key={idx} component="div">
				<Link href={item.link}>
					<ListItemButton component="a">
						{item?.icon && (
						<ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
						)}
						<ListItemText primary={item.title} />
					</ListItemButton>
				</Link>
			</ListItem>
		  ))}
		</List>
	  </Box>
	);
  }