import React from 'react';

const SearchMovie = (props) => {
	return (
		<div className='block text-gray-700 text-sm font-bold'>
			<input
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search for a movie'
			></input>
		</div>
	);
};

export default SearchMovie;
