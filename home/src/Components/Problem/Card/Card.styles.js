export default theme => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	link: {
		textDecoration: 'inherit',
		color: 'inherit'
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
        backgroundImage: "url(//images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)"
	},
	cardContent: {
		flexGrow: 1,
	},
});