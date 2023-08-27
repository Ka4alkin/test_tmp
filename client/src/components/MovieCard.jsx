import React from 'react';

const MovieCard = ({movie}) => {
  return (
    <div className="bg-white p-4 rounded shadow-md w-full">
      <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
      <p className="text-gray-600">Year: {movie.year}</p>
      <p className="text-gray-600">Format: {movie.format}</p>
      {!!movie?.Actors?.length && <>
        <h4 className="text-md font-medium text-gray-600 mt-2">Actors:</h4>
        <ul className="list-disc list-inside mt-1">
          {movie.Actors.map((actor) => (
            <li key={actor.id}>{actor.name} {actor.surname}</li>
          ))}
        </ul>
      </>}
    </div>
  );
};

export default MovieCard;
