import { 
	Html, 
	Head, 
	Main, 
	NextScript, 
	type DocumentProps, 
	type DocumentContext
} from 'next/document';

import { 
	DocumentHeadTags,
	documentGetInitialProps, 
	type DocumentHeadTagsProps
} from '@mui/material-nextjs/v14-pagesRouter';

export default function MyFoodieDocument(props: DocumentProps &DocumentHeadTagsProps) {
	return (
	<Html lang="en">
		<Head>
			<link rel="icon" href="/icons8-food-50.png" />
          	<meta name="emotion-insertion-point" content=""/>
			<DocumentHeadTags {...props} />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
	);
}
	
MyFoodieDocument.getInitialProps = async (ctx: DocumentContext) => {
	const finalProps = await documentGetInitialProps(ctx);
	return finalProps;
};
	