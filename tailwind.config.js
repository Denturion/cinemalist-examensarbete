module.exports = {
	content: ['.pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			primary: '#3490dc',
			secondary: '#ffed4a',
			danger: '#e3342f',
			white: 'rgb(var(==white)/<alpha-value>)',
		},
		fluidContainer: {
			default: {
				maxWidth: '800px', // defaults to null (no max width)
				padding: '15px', // defaults to '15px'
			},
		},
	},
	variants: {
		// for the utilities
		fluidContainer: ['responsive'], // defaults to ['responsive']
	},
	plugins: [require('tailwindcss-fluid-container')],
};
