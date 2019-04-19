export default theme => ({
	appBar: {
		position: 'relative',
	},
	link: {    
        textDecoration: "inherit",
        color: "inherit",
        display: "inherit",
        padding: "inherit",
        margin: "inherit",
        flexGrow: 1
	},
	logout: {
		textDecoration: 'inherit',
		color: 'inherit',
		marginLeft: '10px'
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
		width: '2em',
		height: '2em'
	},
	title: {
        flexGrow: 1,
        margin: theme.spacing.unit ,
	}
});