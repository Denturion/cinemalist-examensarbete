import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	onSnapshot,
} from 'firebase/firestore';
import MovieList from '../components/MovieList';
import Heading from '../components/Heading';
import SearchMovie from '../components/SearchMovie';
import AddToList from '../components/AddToList';
import RemoveFromList from '../components/RemoveFromList';
import IMovieData from '@/types/movie.type';
import ProtectedRoute from '../components/ProtectedRoute';
import { db } from '../firebase/clientApp';
import { getAuth } from 'firebase/auth';

export default function Home() {
	// const db = getFirestore();

	const [user, loading, error] = useAuthState(getAuth());
	// console.log('Loading:', loading, '|', 'Current user:', user);
	const [movies, setMovies] = useState([]);
	const [userMovieList, setUserMovieList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	// Fetching users movie list from DB //
	const colRef = collection(db, 'movieListDB');

	useEffect(() => {
		const getMovieList = async () => {
			try {
				const data = await getDocs(colRef);
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setUserMovieList(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		getMovieList();
		console.log(userMovieList);
	}, []);

	// Search function //
	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7db2dcc4`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	// Saving movie to list //
	// const saveToDB = async (items: [IMovieData]) => {
	// 	await db.collection('movieListDB').doc(user.uid).set({ items });
	// };

	const addMovieToList = (movie: [IMovieData]) => {
		const newMovieList = [...userMovieList, movie];
		setUserMovieList(newMovieList);
		// saveToDB(newMovieList);
	};

	// Remove movie from list //
	const removeMovieFromList = (movie: [IMovieData]) => {
		const newMovieList = userMovieList.filter(
			(userMovieList) => userMovieList.imdbID !== movie.imdbID
		);

		setUserMovieList(newMovieList);
		// saveToDB(newMovieList);
	};

	return (
		<ProtectedRoute>
			<div className='container-fluid p-6'>
				<div className='row flex items-center'>
					<SearchMovie
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
				</div>

				<div className='row flex w-full h-full'>
					<MovieList
						movies={movies}
						handleListClick={addMovieToList}
						movieListComponent={AddToList}
					/>
				</div>
				<div className='row flex items-center mt-4 mb-4'>
					<Heading heading='Your list' />
				</div>
				<div className='row flex w-full h-full'>
					<MovieList
						movies={userMovieList}
						handleListClick={removeMovieFromList}
						movieListComponent={RemoveFromList}
					/>
				</div>
			</div>
		</ProtectedRoute>
	);
}
