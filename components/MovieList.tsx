import React from 'react';

const MovieList = (props: any) => {
	const MovieListComponent = props.movieListComponent;

	return (
		<>
			{props.movies?.map((movie: { Poster: string }) => (
				<div className='image-container flex w-[160px] justify-start m-2 shrink-0'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleListClick(movie)}
						className='overlay f-flex align-items-center justify-content-center'
					>
						<MovieListComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
